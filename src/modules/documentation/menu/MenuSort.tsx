<template>
    <div>
        <ToolsOrderableView :items="menus" @text_click="showSubMenu" @ordered="sorted" />

        <b-modal v-model="rdata.showSubMenu" hide-footer @hidden="resetData"
            :title="'Order sub menu ' + rdata.activeMenu?.name">
            <ToolsOrderableView :items="rdata.activeMenu?.sub_menu"  @ordered="sorted" />
        </b-modal>
    </div>
</template>
<script lang="ts">
import { useAuthRepo } from "~/modules/auth/repository/authRepo"
import { usePopup } from "~/repository/popup"
import { stringHelper } from "~/repository/stringHelper"
import MenuEditor from "./MenuEditor.vue"
import { useMenuApi } from "./repository/menuApi"
import { menu } from "./type/menu"


export default defineComponent({
    components: { MenuEditor },
    setup() {
        const rdata = reactive({
            showSubMenu: false,
            parent_id: 0,
            activeMenu: undefined as unknown as menu,
        })
        const route = useRoute()
        const { auth } = useAuthRepo()
        const menuApi = useMenuApi()
        const { charUrlFriendly } = stringHelper;
        var menuId = computed(() => parseInt(route.params.id || '1'))

        onMounted(async () => {
            await menuApi.get({ show_parent_only: true })
        })
        const menus = computed(() => menuApi.data)
        function showSubMenu(menu: menu) {
            rdata.activeMenu = menu
            rdata.showSubMenu = true
        }
        function resetData() {
            rdata.activeMenu = undefined as unknown as menu
            rdata.parent_id = 0
        }
        async function sorted(payload: any) {
            await menuApi.sorted(payload)
            usePopup().toast("Berhasil di simpan")
            await menuApi.get({ show_parent_only: true })
        }
        return {
            rdata,
            auth,
            menus,
            menuId,
            charUrlFriendly,
            showSubMenu,
            resetData,
            sorted
        }
    },
})
</script>
