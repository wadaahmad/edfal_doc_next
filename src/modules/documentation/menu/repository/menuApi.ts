import { create } from 'zustand'
import { menu } from '../type/menu'
import restApi from '@/repository/restApi';

interface menuApi {
    data: Array<menu> | undefined,
    meta: Array<any>,
    link: Array<any>,
    active_menu: menu,
    search_result: Array<menu> | undefined,
    get: (payload?: any) => void,
    search: (payload?: any) => void,
    getActiveMenu: (payload?: any) => void,
    sorted: (payload: any) => void,
    del: (payload: any) => void,
    store: (payload: any) => Promise<boolean>,
}

export const useMenuApi = create<menuApi>((set, get) => ({
    data: undefined as Array<menu> | undefined,
    meta: Array(),
    link: Array(),
    active_menu: Object() as menu,
    search_result: undefined as Array<menu> | undefined,

    async get(payload: any = null) {
        await restApi.$get('edfal/documentations/menus', payload).then(res => {
            set({
                data: res.data,
                meta: res.meta,
                link: res.link
            })

        }).catch((error) => {
            if (error.status == 404) {

            }
        });
    },
    async search(payload: any = null) {
        await restApi.$get('edfal/documentations/menus', payload).then(res => {
            set({
                search_result: res.data
            })
        }).catch((error) => {
            if (error.status == 404) {

            }
        });
    },
    async getActiveMenu(payload: any = null) {
        await restApi.$get('edfal/documentations/menus', payload).then(res => {
            set({
                active_menu: res.data[0]
            })
        }).catch((error) => {
            if (error.status == 404) {

            }
        });
    },
    async sorted(payload: any) {
        await restApi.$put('edfal/documentations/menus/sorted', { sort_list: payload }).then((res) => {

        }).catch((err) => {

        })
    },
    async del(id: any) {
        await restApi.$delete('edfal/documentations/menus/' + id).then(res => {
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
            url = 'edfal/documentations/menus'
        } else {
            method = 'PUT'
            url = 'edfal/documentations/menus/' + payload.id
        }
        return await restApi
            .$request({
                method: method,
                url: url,
                data: payload,
            })
    },
}))
