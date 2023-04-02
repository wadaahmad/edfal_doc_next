import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function LayoutDefault({ children }: {
  children: ReactNode,
}) {
  return (
    <>
      <Navbar />
      <div className="d-flex align-items-stretch">
        <Sidebar />
        <div id="page-content-wrapper" className="pl-1">
          <div className="content">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  )

}
