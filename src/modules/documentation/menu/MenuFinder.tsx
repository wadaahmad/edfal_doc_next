import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { useMenuApi } from "./repository/menuApi"
import { menu } from "./type/menu"
export default function MenuFinder() {
    const [filterText, setFilterText] = useState('')
    const menuApi = useMenuApi()
    const router = useRouter()
    async function search() {
        await menuApi.search({ name: filterText })
    }
    const searchResults = useMemo(() => menuApi.search_result, [menuApi])
    const isFound = useMemo(() => {
        if (searchResults != undefined) {
            if (searchResults.length > 0)
                return true
        }
        return false
    }, [searchResults])
    function goMenu(menu: menu) {
        router.push('/menus/' + menu.id)
        setFilterText('')
    }
    return (
        <div><fieldset className="form-group pt-3 px-2 my-1" id="__BVID__17">
            <div><div role="group" className="input-group input-group-sm">
                <input id="filter-input" type="search" placeholder="Type to Search" autoComplete="off" value={filterText} onChange={(e) => setFilterText(e.target.value)} onKeyUp={search} className="form-control" />
                <div className="input-group-append"></div>
            </div>
                {filterText.length > 0 &&
                    <div className="bg-white px-2 py-3 border border-secondary" style={{ position: 'absolute', width: '500px', zIndex: 2147483647, display: 'block' }}>
                        {isFound
                            ? <ul className="pl-0">
                                {
                                    searchResults?.map((result: any) => (
                                        <li v-for="result in searchResults" onClick={() => goMenu(result)}>
                                            {result.parent_name != null
                                                ?
                                                <span ><b>{result.parent_name + ' / '}</b>
                                                    {result.name}</span>
                                                :
                                                <span ><b>{result.name}</b></span>
                                            }
                                        </li>
                                    ))

                                }
                            </ul>
                            : <div className="text-secondary">Data not found</div>
                        }
                    </div>
                }
            </div></fieldset >
        </div >
    )
}

