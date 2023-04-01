<template>
  <!-- Sidebar -->
  <b-collapse id="sidebar" class="bg-white" v-model="data.sidebarShow">
    <menu-finder />
    <div id="sidebar-wrapper">
      <div class="list-group list-group-flush p-2">
        <menu-view />
      </div>
    </div>
  </b-collapse>
  <!-- /#sidebar-wrapper -->
</template>
<script lang="ts">
import { useAuthRepo } from "~/modules/auth/repository/authRepo"
import MenuFinder from "~/modules/documentation/menu/MenuFinder.vue"
import MenuView from "~/modules/documentation/menu/MenuView.vue"
import UserProfileView from "~/modules/users/UserProfileView.vue"
import { useLegacyContext } from "~/repository/legacyContext"

export default defineComponent({
  components: { UserProfileView, MenuView, MenuFinder },
  setup(props) {
    const data = reactive({
      sidebarShow: true,
    })
    const route = useRoute()
    watch(() => route.params, () => {
      if (window.innerWidth < 768)
        ctx.value.$emit('bv::toggle::collapse', 'sidebar')
      // menuId = parseInt(route.params.id)
      // console.log(menuId)
      // console.log(rdata.activeMenu)
    })
    const { ctx } = useLegacyContext()
    const { auth } = useAuthRepo()
    onMounted(() => {
      if (window.innerWidth < 768) {
        data.sidebarShow = false
        ctx.value.$emit('bv::toggle::collapse', 'sidebar')
        // this.$root.$emit('bv::toggle::collapse', 'sidebar')
      }
    })
    function clickSidebar() {
      if (window.innerWidth < 768) {
        data.sidebarShow = false
        ctx.value.$emit('bv::toggle::collapse', 'sidebar')
      }
    }
    return {
      data,
      clickSidebar,
      auth
    }
  }

})

</script>