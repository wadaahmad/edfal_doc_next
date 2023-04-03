import Link from 'next/link'
import { useRef, useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import { useMenuApi } from '@/modules/documentation/menu/repository/menuApi';
import { usePopup } from '@/bReact/Popup';

export default function Navbar() {
  const [stateMenu, setMenu] = useState(false);
  const { data: session } = useSession()
  const menuApi = useMenuApi()
  const hideMenu = async () => {
    setMenu(false);
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

        <ul className="navbar-nav ms-auto">
          {session &&
            <span className="btn btn-main glow-on-hover " onClick={() => signOut()}> {session.user?.name}
            </span>
          }
        </ul>
      </nav>
    </>
  )
}

