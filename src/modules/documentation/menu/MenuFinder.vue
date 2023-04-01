<template>
    <div>
        <b-form-group label-align-sm="right" class="pt-3 px-2 my-1" label-size="sm">
            <b-input-group size="sm">
                <b-form-input @keyup="search" v-model="filterText" id="filter-input" autocomplete="off" type="search"
                    placeholder="Type to Search">
                </b-form-input>

                <b-input-group-append>
                </b-input-group-append>

            </b-input-group>
            <div v-if="filterText.length > 0"
                style="position:absolute; width:500px; z-index: 999999999999; display: block;"
                class="bg-white px-2 py-3 border border-secondary">
                <div v-if="isFound">
                    <ul class="pl-0">
                        <li v-for="result in searchResults" :key="result.id" @click="goMenu(result)">
                            <span v-if="result.parent_name != null"><b>{{ result.parent_name + ' / ' }}</b>
                                {{ result.name }}</span>
                            <span v-else><b>{{ result.name }}</b></span>
                        </li>
                    </ul>
                </div>
                <div v-else class="text-secondary">
                    Data not found
                </div>
            </div>
        </b-form-group>

        <b-popover target="filter-input" triggers="manual" placement="bottom" container="my-container" ref="popover"
            variant="success">
            <template #title>
                Contact US
            </template>

            <div style="width:500px">
                asjdkhasjd jkashd ashd s
            </div>
        </b-popover>
    </div>
</template>
<script lang="ts">
import { useMenuApi } from "./repository/menuApi"
import { menu } from "./type/menu"

export default defineComponent({
    setup() {
        const filterText = ref('')
        const menuApi = useMenuApi()
        const router = useRouter()
        function search() {
            menuApi.search({ name: filterText.value })
        }
        const searchResults = computed(() => menuApi.search_result)
        const isFound = computed(() => {
            if (searchResults.value != undefined) {
                if (searchResults.value.length > 0)
                    return true
            }
            return false
        })
        function goMenu(menu: menu) {
            router.push('/menus/' + menu.id)
            filterText.value = ''
        }
        return {
            filterText,
            search,
            searchResults,
            isFound,
            goMenu
        }
    },
})
</script>
