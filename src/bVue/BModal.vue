<template>
    <div class="modal fade" ref="modalElement" :id="modalId">

        <div :class="['modal-dialog', 'modal-' + size, {         'modal-dialog-centered':         center         }]">
            <div class="modal-content">
                <div class="modal-header" v-if="!hideHeader">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" @click="hide" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot />
                </div>
                <div class="modal-footer" v-if="!hideFooter">
                    <button type="button" class="btn btn-secondary" @click="hide">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        show: Boolean,
        modelValue: Boolean,
        center: Boolean,
        title: String,
        size: {
            type: String,
            default: ''
        },
        hideFooter: Boolean,
        hideHeader: Boolean,
    },
    emits: ['update:modelValue', 'show', 'ok', 'hide', 'hidden'],
    setup(props, { emit }) {
        const modalId = computed(() => Math.floor(Math.random() * 1000).toString() + '__bmodal')
        const { $bootstrap } = useNuxtApp()
        const modalElement = ref()
        const modal = ref()
        const open = ref(props.show || props.modelValue)
        onMounted(async () => {
            // console.log(props)
            await $bootstrap?.then(({ Modal }: any) => {
                modal.value = new Modal(modalElement.value, { backdrop: true })

            })
            if (open.value)
                show()

            modalElement.value.addEventListener('hidden.bs.modal', () => {
                emit('hidden')
                emit('update:modelValue', false)
            })

        })
        watch(() => props, (data) => {
            if (data.show || data.modelValue) {
                modal.value.show()
            } else {
                hide()
            }
        }, { deep: true })

        function hide() {
            modal.value.hide()
            emit('update:modelValue', false)

        }
        function show() {
            modal.value.show()
            emit('update:modelValue', true)

        }
        return {
            modalId,
            modal,
            modalElement,
            hide
        }
    },
})
</script>
