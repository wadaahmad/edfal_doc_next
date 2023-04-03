
import { usePopup } from '@/bReact/Popup'
import { reactive } from '@/repository/reactivity'
import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { useMenuApi } from './repository/menuApi'
import { menu } from './type/menu'
interface MenuEditor {
    parent_id: number,
    menu?: menu
}
export default function MenuEditor(props: MenuEditor) {
    const [rdata, setRdata] = reactive({
        id: '',
        name: '',
        parent_id: 0
    })
    const menuApi = useMenuApi()
    useEffect(() => {
        if (props.parent_id != undefined)
            rdata.parent_id = props.parent_id
        if (props.menu) {
            Object.entries(props.menu).forEach((val: any, idx: any) => {
                setRdata(rdata[val[0] as keyof typeof rdata] = val[1] as never)
            })
        }
    })
    async function store(e: KeyboardEvent<any>) {
        if (e.key == 'Enter') {
            await menuApi.store(rdata).then((res) => {
            }).catch((err) => {
                usePopup().msgBoxOk('Failed save', "FAILED")
            })
        }

    }
    return (
        <div className="mb-2">
            <input type="text" placeholder="Create new menu" value={rdata.name} onChange={(e) => setRdata({ name: e.target.value })} onKeyUp={store}
                className="form-control" />
        </div>
    )
}

