import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'

export default function Default({ children }: {
  children: ReactNode,
}) {
  return (
    <>
      <Navbar />
      <div class="d-flex align-items-stretch">
        <sidebar />
        <div id="page-content-wrapper" class="pl-1">
          <div class="content">

            <Nuxt />

          </div>
        </div>
      </div>
      <b-alert :show="isLoading" class="mx-auto position-fixed fixed-top mt-1 rounded-pill text-center"
      style="z-index: 2000; width: 220px; " variant="light" dismissible>
      <b-spinner small label="Spinning"></b-spinner> <b>
        Loading data</b>
    </b-alert>
    </>
  )

}
