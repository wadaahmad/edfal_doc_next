import { create } from 'zustand'
import restApi from '@/repository/restApi';
import { appVersion } from '../type/appVersion'

interface appVersionApi {
    data: Array<appVersion> | undefined,
    meta: Array<any>,
    link: Array<any>,
    get: (payload?: any) => void,
    del: (payload: any) => void,
    store: (payload: any) => Promise<boolean>,
}

export const useAppVersionApi = create<appVersionApi>((set, get) => ({

    data: undefined as Array<appVersion> | undefined,
    meta: Array(),
    link: Array(),

    async get(payload: any = null) {
        await restApi.$get('edfal/documentations/app-versions', payload ).then(res => {
            this.data = res.data
            this.meta = res.meta
            this.link = res.link
        }).catch((error) => {
            if (error.status == 404) {

            }
        });
    },
    async del(id: any) {
        await restApi.$delete('edfal/documentations/app-versions/' + id).then(res => {
            if (this.data != undefined) {
                var index = this.data.findIndex((data) => data.id == id)
                this.data.splice(index, 1)
            }
        });
    },
    async store(payload: any) {
        let method: string, url: string
        if (payload.id == '') {
            method = 'POST'
            url = 'edfal/documentations/app-versions'
        } else {
            method = 'PUT'
            url = 'edfal/documentations/app-versions/' + payload.id
        }
        return await restApi
            .$request({
                method: method,
                url: url,
                data: payload,
            })

    },

}))
