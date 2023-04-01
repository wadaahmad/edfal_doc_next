<template>
  <div>
    <navbar-print-view />
    <div id="wrapper">
      <div id="content-nosidebar">
        <div>
          <Nuxt />
        </div>
      </div>
    </div>
    <span v-html="schoolStyle"></span>
  </div>
</template>

<script lang="ts">
import { useStyleRepo } from "~/repository/styleRepo"
import { useRulesRepo } from "~/repository/rulesRepo"
import NavbarPrintView from "~/components/NavbarPrintView.vue"
export default defineComponent({
  components: { NavbarPrintView },
  setup() {
    let { schoolStyle } = useStyleRepo()
    let { sch } = useRulesRepo()
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
      sch,
      schoolStyle
    }

  },
})
</script>

