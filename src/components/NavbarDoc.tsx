import Link from 'next/link'
import { useRef, useState } from 'react'
import { classNames } from '@/helper/styleHelper'
import { useSession, signIn, signOut } from "next-auth/react"
import restApi from '@/repository/restApi';
import { useMenuApi } from '@/modules/documentation/menu/repository/menuApi';
import MenuEditor from '@/modules/documentation/menu/MenuEditor';

export default function Navbar() {
  const [stateMenu, setMenu] = useState(false);
  const { data: session } = useSession()
  const menuApi = useMenuApi()
  const hideMenu = async () => {
    setMenu(false);
    menuApi.get()
    console.log(menuApi.data)
  }
  const sMenu = () => {
    setMenu(true);
    // console.log(session?.user.user)
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light p-2">
        <div className="container">
          {String(stateMenu)}
          <Link className="navbar-brand" href="/"><img src="~assets/img/zchool.svg" style={{ marginRight: "7px" }} />
          </Link>

          <div className={classNames({ 'offcanvas offcanvas-end': true, 'show': stateMenu })} tabIndex={-1} id="navbarSupportedContent"
            aria-labelledby="navbarSupportedContent" data-bs-animation="ease-in-out">
            <div className="offcanvas-header text-dark bg-light">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" className="btn btn-outline-dark" onClick={hideMenu}
                aria-label="Close">Close</button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0 fw-bold" onClick={hideMenu} >

                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => signIn()}>
                    About
                  </button>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/features">
                    Fitur
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/modules">
                    Module & Harga
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/smartidcards">
                    Z-Card
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" target="_blank" href="https://doc.zchool.net">
                    Dokumentasi
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" target="_blank" href="https://dschool.edfal.com">
                    Demo
                  </a>
                </li>
              </ul>
            </div >
          </div >
          <Link className="btn btn-main glow-on-hover ms-2" href="/registers"> Join sekarang.!
          </Link>
          <button className="navbar-toggler" type="button" onClick={sMenu} aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
          </button >
        </div >
      </nav >
    </>
  )
}

