import type { ReactNode } from 'react'

export default function Blank({ children }: {
  children: ReactNode,
}) {
  return <div id="wrapper">
    <div id="content-nosidebar">
      <div>
        <main>{children}</main>
      </div>
    </div>
  </div>
}
