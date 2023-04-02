import MenuFinder from "@/modules/documentation/menu/MenuFinder"
import MenuView from "@/modules/documentation/menu/MenuView"
import { reactive } from "@/repository/reactivity"

export default function Sidebar() {
  const data = reactive({
    sidebarShow: true,
  })
  // const route = useRoute()

  // const { ctx } = useLegacyContext()
  // const { auth } = useAuthRepo()
  // onMounted(() => {
  //   if (window.innerWidth < 768) {
  //      ctx.value.$emit('bv::toggle::collapse', 'sidebar')
  //     // this.$root.$emit('bv::toggle::collapse', 'sidebar')
  //   }
  // })
  // function clickSidebar() {
  //   if (window.innerWidth < 768) {
  //     data.sidebarShow = false
  //     ctx.value.$emit('bv::toggle::collapse', 'sidebar')
  //   }
  // }    data.sidebarShow = false
 
  return (
    <div id="sidebar" className="bg-white" v-model="data.sidebarShow">
      <MenuFinder />
      <div id="sidebar-wrapper">
        <div className="list-group list-group-flush p-2">
          <MenuView />
        </div>
      </div>
    </div>
  )
}


