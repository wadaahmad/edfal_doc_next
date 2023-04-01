<template>
    <b-modal v-model="rdata.show" hide-footer hide-header no-close-on-backdrop no-close-on-esc>
        <div>
            <h3 class="mb-2">{{ title }}</h3>
            {{ message }}
        </div>
        <b-button @click="store(true)">OK</b-button>
        <b-button @click="store(false)">Cancel</b-button>
    </b-modal>
</template>
<script lang="ts">

export default defineComponent({
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Please confirm.'
        },
        message: {
            type: String,
            default: 'Are you sure to do this action.?'
        }
    },
    setup(props, { emit }) {
        const rdata = reactive({
            show: false
        })
        onMounted(() => {
            rdata.show = props.isShow
        })
        function show(val: boolean) {
            rdata.show = val
        }
        function store(val: boolean) {
            rdata.show = val
        }
        return {
            rdata,
            show,
            store
        }
    },
})
</script>
