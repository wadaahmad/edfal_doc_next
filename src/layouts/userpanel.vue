<template>
  <div>
    <Navbar />
    <div class="d-flex align-items-stretch" v-if="$auth.loggedIn">
      <sidebar />
      <div id="page-content-wrapper" class="pl-1">
        <div class="content">
          <b-overlay :show="helper.isLoading" rounded="sm">
            <Nuxt />
          </b-overlay>
        </div>
      </div>
    </div>
    <div class="align-items-stretch" v-else>
      <Nuxt />
    </div>
    <span v-html="schoolStyle"></span>
  </div>
</template>

<script lang="ts">
import Navbar from '~/modules/dashboard/layout/Navbar'
import Sidebar from '~/modules/dashboard/layout/Sidebar.vue'
import { useStyleRepo } from '~/repository/styleRepo'
import { defineComponent, computed, ref } from '@vue/composition-api'
import { useHelpers } from '~/stores/helpers'
import { useRulesRepo } from '~/repository/rulesRepo'
export default defineComponent({
  setup() {
    let { schoolStyle } = useStyleRepo()
    let { sch } = useRulesRepo()
    const helper = useHelpers()
    useHead({
      title: sch?.name,
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: sch?.icon,
        },
      ]
    })
    return {
      helper,
      sch,
      schoolStyle
    }
  },

  //layout: 'default',
  components: {
    Navbar,
    Sidebar,
  },
})
</script>
