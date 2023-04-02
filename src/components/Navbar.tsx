import Link from 'next/link'
import { useRef, useState } from 'react'
import { classNames } from '@/helper/styleHelper'
import { useSession, signIn, signOut } from "next-auth/react"
import restApi from '@/repository/restApi';
import { useMenuApi } from '@/modules/documentation/menu/repository/menuApi';
import MenuEditor from '@/modules/documentation/menu/MenuEditor';
import MenuFinder from '@/modules/documentation/menu/MenuFinder';
import { usePopup } from '@/bVue/Popup';
import BModal from '@/bVue/BModal';

export default function Navbar() {
  const [stateMenu, setMenu] = useState(false);
  const { data: session } = useSession()
  const menuApi = useMenuApi()
  const hideMenu = async () => {
    setMenu(false);
    menuApi.get()
    console.log(menuApi.data)
    usePopup().msgBoxOk("This msg box").show()
  }
  const sMenu = () => {
    setMenu(true);
    // console.log(session?.user.user)
  }
  return (
    <>
      <nav className="navbar sticky-top navbar-light bg-light navbar-expand-lg">
        <button className="navbar-toggler" type="button" onClick={sMenu} aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button >
        <a href="/" aria-current="page" target="_self" className="navbar-brand navbar-doc nuxt-link-exact-active nuxt-link-active" style={{ width: '15.5rem' }}>
          Zchool-DOC
        </a>
        <ul className="navbar-nav"></ul>
      </nav>
    </>
  )
}

