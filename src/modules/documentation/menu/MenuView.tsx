import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import Link from 'next/link'
import MenuEditor from "./MenuEditor"
import { useMenuApi } from "./repository/menuApi"
import { menu } from "./type/menu"
import {
    faCirclePlus,
    faPencil,
    faTrashCan,
    faSortAlphaDown,
    faFire
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { reactive } from "@/repository/reactivity"
import { icon } from "@fortawesome/fontawesome-svg-core"
import { usePopup } from "@/bReact/Popup"
import { useStringRepo } from "@/repository/stringRepo"
import { classNames } from "@/helper/styleHelper"

export default function MenuView() {

    const { data: session } = useSession()
    const [rdata, setRdata] = reactive({
        showEditor: false,
        showSort: false,
        parent_id: 0,
        activeMenu: undefined as unknown as menu,
        activeToEditMenu: undefined as unknown as menu,
    })
    const router = useRouter()
    const menuApi = useMenuApi()
    const { charUrlFriendly } = useStringRepo();
    var menuId = useMemo(() => router.query.id, [router])
    // menuApi.get({ show_parent_only: true })
    // menuApi.getActiveMenu({ id: menuId })
    // setRdata({ activeMenu: activeMenu as unknown as menu })
    useEffect(() => {
        menuApi.get({ show_parent_only: true })
        menuApi.getActiveMenu({ id: menuId })
        setRdata({ activeMenu: activeMenu as unknown as menu })
    }, [])
    const activeMenu = useMemo(() => menuApi.active_menu, [menuApi])

    const menus = useMemo(() => menuApi.data, [menuApi])
    async function goMenu(menu: menu) {
        await menuApi.get({ show_parent_only: true })
        router.push('/menus/' + menu.id)
        rdata.showEditor = false
    }
    function addSubMenu(parentId: any) {
        rdata.parent_id = parentId
        rdata.showEditor = true
    }
    function editMenu(menu: menu) {
        rdata.activeToEditMenu = menu
        rdata.showEditor = true
    }
    function resetData() {
        rdata.activeToEditMenu = undefined as unknown as menu
        rdata.parent_id = 0
    }
    function isActiveSubMenu(Id: any) {
        if (rdata.activeMenu != undefined) {
            if (rdata.activeMenu.parent_id == 0) {
                if (Id == rdata.activeMenu.id)
                    return true
            } else {
                if (Id == rdata.activeMenu.parent_id)
                    return true
            }
        }
        return false
    }
    async function dellMenu(id: any) {
        var confirm = await usePopup().msgBoxOk("anda yakin ingin menghapus data.?")
        if (confirm)
            await menuApi.del(id)
        await menuApi.get({ show_parent_only: true })
    }
    return (
        <div>
            {session &&
                <div className="mt-3">
                    <button className="ml-2 btn btn-outline-dark w-auto" onClick={() => setRdata({ showEditor: true })}>
                        <FontAwesomeIcon icon={faCirclePlus} className="icon mr-1" />Add
                    </button>
                    <button className="ml-2 btn btn-outline-dark w-auto" onClick={() => setRdata({ showSort: true })}>
                        <FontAwesomeIcon icon={faSortAlphaDown} className="icon mr-1" />Sorted
                    </button>
                </div>
            }
            <Link href="/" className={classNames({ "my-3 text-mini list-group-item-action flex-column align-items-start px-1": true, 'active': router.pathname == '/' })}>
                <div className="d-flex w-100 justify-content-start align-items-center">

                    <span className="menu-collapsed">
                        <h6 className="mb-0">App Changelog
                            <FontAwesomeIcon icon={faFire} className="icon mr-1 text-danger" />
                        </h6>
                    </span>

                    <span className="submenu-icon ml-auto"></span>
                </div>
            </Link>
            {menus?.map((menu) => (
                <>
                    <Link href={'/menus/' + menu.id + '-' + charUrlFriendly(menu.name)} className={classNames({ "my-3 text-mini list-group-item-action flex-column align-items-start px-1": true, 'active': router.asPath == '/menus/' + menu.id + '-' + charUrlFriendly(menu.name) })} >
                        <div className="d-flex w-100 justify-content-start align-items-center" onClick={() => setRdata({ activeMenu: menu })}>

                            <span className="menu-collapsed">
                                <h6 className="mb-0">{menu.name}
                                    {session &&
                                        <>
                                            <FontAwesomeIcon icon={faCirclePlus} onClick={() => addSubMenu(menu.id)} className="icon mr-0" />
                                            <FontAwesomeIcon icon={faPencil} onClick={() => editMenu(menu)} className="icon mr-0" />
                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => dellMenu(menu.id)}
                                                className="icon mr-0" />
                                        </>
                                    }
                                </h6>
                            </span>

                            <span className="submenu-icon ml-auto"></span>
                        </div>
                    </Link >
                    {isActiveSubMenu(menu.id) &&
                        menu.sub_menu?.map((sub) => (
                            <Link href={'/menus/' + sub.id + '-' + charUrlFriendly(sub.name)} className={classNames({ "my-2 text-mini list-group-item-action flex-column align-items-start px-1": true, 'active': router.asPath == '/menus/' + sub.id + '-' + charUrlFriendly(sub.name) })}>
                                <div className="d-flex w-100 justify-content-start align-items-center ml-2" onClick={() => setRdata({ activeMenu: sub })}>

                                    <span className="menu-collapsed">{sub.name}
                                        {session &&
                                            <>
                                                <FontAwesomeIcon icon={faPencil} onClick={() => editMenu(sub)} className="icon mr-0" />
                                                <FontAwesomeIcon icon={faTrashCan} onClick={() => dellMenu(sub.id)}
                                                    className="icon mr-0" />
                                            </>
                                        }
                                    </span>
                                    <span className="submenu-icon ml-auto"></span>
                                </div>
                            </Link >
                        ))
                    }
                </>
            ))}
        </div >

    )
}

