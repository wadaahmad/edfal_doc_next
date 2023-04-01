<template>
  <b-navbar sticky toggleable="lg" type="dark" variant="secondary" class="bg-secondary unprint mb-3">
    <div class="container p-2">
      <b-col>
        <div class="text-center">
          <b-button @click="print" class="rounded">
            <fa icon="fa-solid fa-print" class="icon" /> Print
          </b-button>
        </div>
      </b-col>
    </div>
  </b-navbar>
</template>

<style>
</style>
<script lang="ts">
import { useUiRepo } from "~/repository/uiRepo"

export default defineComponent({
  setup() {
    const { print } = useUiRepo()
    return {
      print
    }
  }
})
</script>
