import { create } from 'zustand'
import restApi from '@/repository/restApi';
import { content } from '../type/content'

interface contentApi {
    data: Array<content> | undefined,
    meta: Array<any>,
    link: Array<any>,
    get: (payload?: any) => void,
    del: (payload: any) => void,
    store: (payload: any) => Promise<boolean>,
}
export const useContentApi = create<contentApi>((set, get) => ({

    data: undefined as Array<content> | undefined,
    meta: Array(),
    link: Array(),

    async get(payload: any = null) {
        await restApi.$get('edfal/documentations/contents', payload).then(res => {
            set({
                data: res.data,
                meta: res.meta,
                link: res.link,
            })
        }).catch((error) => {
            set({
                data: undefined
            })
            if (error.status == 404) {

            }
        });
    },
    async del(id: any) {
        await restApi.$delete('edfal/documentations/contents/' + id).then(res => {
            if (get().data) {
                var index = get().data?.findIndex((data) => data.id == id)
                if (index)
                    set({
                        data: get().data?.splice(index, 1)
                    })
            }
        });
    },
    async store(payload: any) {
        let method: string, url: string
        if (payload.id == '') {
            method = 'POST'
            url = 'edfal/documentations/contents'
        } else {
            method = 'PUT'
            url = 'edfal/documentations/contents/' + payload.id
        }
        return await restApi
            .$request({
                method: method,
                url: url,
                data: payload,
            })
    }
}))
