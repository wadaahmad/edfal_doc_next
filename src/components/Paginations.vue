<template>
  <b-button-toolbar key-nav aria-label="Toolbar with button groups" justify>
    <div v-bind:key="index" v-for="(link, index) in item">
      <fa
        v-if="link.label == 'pagination.previous'"
        @click="page(link.page)"
        icon="fa-solid fa-chevron-left" class="icon"
      />
      <b-badge
        pill
        variant="primary"
        @click="page(link.page)"
        class="btn-main"
        size="sm"
        v-if="
          link.label != 'pagination.previous' &&
          link.label != 'pagination.next' &&
          link.active
        "
        >{{ link.label }}</b-badge
      >
      <span
        class="p-1"
        @click="page(link.page)"
        v-if="
          link.label != 'pagination.previous' &&
          link.label != 'pagination.next' &&
          !link.active
        "
      >
        <span size="sm">{{ link.label }}</span>
      </span>
      <fa
        v-if="link.label == 'pagination.next'"
        @click="page(link.page)"
        icon="fa-solid fa-chevron-right" class="icon"
      />
    </div>
  </b-button-toolbar>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    item: {
      type: Array
    },
  },
  methods: {
    page(number){
      this.$emit('page',number)
    }
  },
}
</script>