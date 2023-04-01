<template>
    <div>
        <b-form-group :label="label">
            <b-row>
                <b-col><b-form-file v-model="file" @change="uploadPhoto"></b-form-file></b-col>
                <b-col><img :src="photo" :width="photo_width" /></b-col>
            </b-row>
            
            
        </b-form-group>
    </div>
</template>
<script lang="ts">
import { useImageApi } from "~/repository/images/imageApi"


export default defineComponent({
    props: {
        value: String,
        photo_width: {
            type: String,
            default: '50px'
        },
        label: {
            type: String,
            default: 'Photo'
        },
    },
    emits: ['input'],
    setup(props, { emit }) {
        const photo = ref(props.value)
        const file = ref(null)
        async function uploadPhoto(e: any) {
            var files = e.target.files || e.dataTransfer.files
            files = Array.from(files)
            let { data } = await useImageApi().uploadImage(files)
            // console.log(data)
            photo.value = data[0].url
            emit('input', photo.value)
        }
        return {
            photo,
            file,
            uploadPhoto
        }
    },
})
</script>
