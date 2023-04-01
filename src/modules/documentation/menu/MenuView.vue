<template>
    <div>
        <div v-if="auth.loggedIn">
            <div class="mt-3">
                <b-button variant="outline-dark" @click="rdata.showEditor = true">
                    <fa icon="fa-solid fa-circle-plus" class="icon mr-1" />Add
                </b-button>
                <button class="ml-2 btn btn-outline-dark w-auto" @click="rdata.showSort = true">
                    <fa icon="fa-solid fa-sort-alpha-down" class="icon mr-1" />Sorted
                </button>
            </div>
        </div>
        <NuxtLink :to="'/'" class="
                  my-3
                  text-mini
                  list-group-item-action
                  flex-column
                  align-items-start
                  px-1
                ">
            <div class="d-flex w-100 justify-content-start align-items-center">
                <!-- <fa icon="fa-solid fa-house-chimney" class="icon" /> -->
                <span class="menu-collapsed">
                    <h6 class="mb-0">App Changelog
                        <fa icon="fa-solid fa-fire" class="icon mr-1 text-danger" />
                    </h6>
                </span>

                <span class="submenu-icon ml-auto"></span>
            </div>
        </NuxtLink>
        <div v-for="menu in menus" :key="menu.id">

            <NuxtLink :to="'/menus/' + menu.id + '-' + charUrlFriendly(menu.name)" class="
                  my-3
                  text-mini
                  list-group-item-action
                  flex-column
                  align-items-start
                  px-1
                ">
                <div class="d-flex w-100 justify-content-start align-items-center" @click="rdata.activeMenu = menu">
                    <!-- <fa icon="fa-solid fa-house-chimney" class="icon" /> -->
                    <span class="menu-collapsed">
                        <h6 class="mb-0">{{ menu.name }}
                            <fa v-if="auth.loggedIn" @click="addSubMenu(menu.id)" icon="fa-solid fa-circle-plus"
                                class="icon mr-0" />
                            <fa v-if="auth.loggedIn" @click="editMenu(menu)" icon="fa-solid fa-pencil" class="icon mr-0" />
                            <fa v-if="auth.loggedIn" @click="dellMenu(menu.id)" icon="fa-solid fa-trash-can"
                                class="icon mr-0" />

                        </h6>
                    </span>

                    <span class="submenu-icon ml-auto"></span>
                </div>
            </NuxtLink>
            <div v-if="isActiveSubMenu(menu.id)">
                <NuxtLink v-for="sub in menu.sub_menu" :key="sub.id"
                    :to="'/menus/' + sub.id + '-' + charUrlFriendly(sub.name)" class="
                  my-2
                  text-mini
                  list-group-item-action
                  flex-column
                  align-items-start
                  px-1
                ">
                    <div class="d-flex w-100 justify-content-start align-items-center ml-2" @click="rdata.activeMenu = sub">
                        <!-- <fa icon="fa-solid fa-house-chimney" class="icon" /> -->
                        <span class="menu-collapsed">{{ sub.name }}
                            <fa v-if="auth.loggedIn" @click="editMenu(sub)" icon="fa-solid fa-pencil" class="icon mr-0" />
                            <fa v-if="auth.loggedIn" @click="dellMenu(sub.id)" icon="fa-solid fa-trash-can"
                                class="icon mr-0" />
                        </span>

                        <span class="submenu-icon ml-auto"></span>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <b-modal v-model="rdata.showSort" hide-footer title="Sort Menu">
            <menu-sort />
        </b-modal>
        <b-modal v-model="rdata.showEditor" hide-footer @hidden="resetData">
            <menu-editor @store="goMenu" :parent_id="rdata.parent_id" :menu="rdata.activeToEditMenu" />
        </b-modal>
    </div>
</template>
<script lang="ts">
import { useAuthRepo } from "~/modules/auth/repository/authRepo"
import { usePopup } from "~/repository/popup"
import { stringHelper } from "~/repository/stringHelper"
import MenuEditor from "./MenuEditor.vue"
import MenuSort from "./MenuSort.vue"
import { useMenuApi } from "./repository/menuApi"
import { menu } from "./type/menu"


export default defineComponent({
    components: { MenuEditor, MenuSort },
    setup() {
        const rdata = reactive({
            showEditor: false,
            showSort: false,
            parent_id: 0,
            activeMenu: undefined as unknown as menu,
            activeToEditMenu: undefined as unknown as menu,
        })
        const router = useRouter()
        const route = useRoute()
        const { auth } = useAuthRepo()
        const menuApi = useMenuApi()
        const { charUrlFriendly } = stringHelper;
        var menuId = computed(() => parseInt(route.params.id || '1'))

        onMounted(async () => {
            await menuApi.get({ show_parent_only: true })
            await menuApi.getActiveMenu({ id: menuId.value })
            rdata.activeMenu = activeMenu.value as unknown as menu
        })
        const activeMenu = computed(() => menuApi.active_menu)

        const menus = computed(() => menuApi.data)
        async function goMenu(menu: menu) {
            await menuApi.get({ show_parent_only: true })
            router.push('/menus/' + menu.id)
            rdata.showEditor = false
        }
        function addSubMenu(parentId: any) {
            rdata.parent_id = parentId
            rdata.showEditor = true
        }
        function editMenu(menu: menu) {
            rdata.activeToEditMenu = menu
            rdata.showEditor = true
        }
        function resetData() {
            rdata.activeToEditMenu = undefined as unknown as menu
            rdata.parent_id = 0
        }
        function isActiveSubMenu(Id: any) {
            if (rdata.activeMenu != undefined) {
                if (rdata.activeMenu.parent_id == 0) {
                    if (Id == rdata.activeMenu.id)
                        return true
                } else {
                    if (Id == rdata.activeMenu.parent_id)
                        return true
                }
            }
            return false
        }
        async function dellMenu(id: any) {
            var confirm = await usePopup().msgBoxConfirm("anda yakin ingin menghapus data.?")
            if (confirm)
                await menuApi.del(id)
            await menuApi.get({ show_parent_only: true })
        }
        return {
            rdata,
            auth,
            menus,
            menuId,
            charUrlFriendly,
            goMenu,
            addSubMenu,
            editMenu,
            resetData,
            isActiveSubMenu,
            dellMenu
        }
    },
})
</script>
