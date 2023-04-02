import { useContentApi } from "@/modules/documentation/content/repository/contentApi"
import { reactive } from "@/repository/reactivity"
import { useStringRepo } from "@/repository/stringRepo"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import {
    faPencil,
    faRobot
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNames } from "@/helper/styleHelper"
import { useSession } from "next-auth/react"

export default function Content() {
    const [rdata, setRdata] = reactive({
        id: '',
        content: '',
        menu_id: '',
        route_name: '',
        hint: '',
        showEditor: false,
        showHintEditor: false,
    })
    const { data: session } = useSession()
    const router = useRouter()
    const contentApi = useContentApi()
    const { dateUs } = useStringRepo()
    var menuId = router.query.id

    useEffect(() => {
        getContent()
    }, [menuId])
    const contents = useMemo(() => contentApi.data != undefined ? contentApi.data[0] : contentApi.data, [contentApi])
    async function getContent() {
        await contentApi.get({ menu_id: menuId })
        if (contents) {
            setRdata({
                route_name: contents?.route_name,
                hint: contents.hint,
                content: contents.content,
                id: contents.id,
            })
        }
    }
    async function store() {
        rdata.menu_id = menuId
        await contentApi.store(rdata)
        await getContent()
        rdata.showEditor = false
        rdata.showHintEditor = false
    }
    return (
        <div>
            {session &&
                <div>
                    <button className="ml-2 btn btn-outline-dark w-auto" onClick={() => setRdata({ showEditor: true })}>
                        <FontAwesomeIcon icon={faPencil} className="icon mr-1" />Add Edit
                    </button>
                    <button className="ml-2 btn btn-outline-dark w-auto" onClick={() => setRdata({ showHintEditor: true })} >
                        <FontAwesomeIcon icon={faRobot} className={classNames({ 'icon': true, 'text-success': contents?.route_name != null })} />
                        Hint
                    </button>
                </div>
            }
            <div className="content-view">
                {contents ?
                    <div >
                        <span dangerouslySetInnerHTML={{ __html: contents?.content }} />
                        <div className="text-right">
                            <i>updated at {dateUs(contents?.updated_at)}</i>
                        </div>
                    </div>
                    :
                    <div>
                        <img src="https://files.edfal.com/img/onprogress.png" style={{ maxWidth: '100%' }} />
                        <h2>Documentations is in progress</h2>
                        we will updated soon.!
                    </div>
                }
            </div>


        </div >
    )
}