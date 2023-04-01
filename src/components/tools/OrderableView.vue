<template>
    <div>
        <ul class="draggable-list" id="draggable-list">
            <li class="mb-1" v-for="(item, index) in listItems" :key="item.id" :data-index="index" @dragover="dragOver"
                @dragenter="dragEnter" @dragleave="dragLeave" @drop="dragDrop($event, index)">
                <span class="number" @click="$emit('number_click', item)">{{ index + 1 }}</span>
                <div class="draggable" draggable @click="$emit('text_click', item)" @dragstart="dragStart($event, index)">
                    <div class="person-name d-flex">
                        <div class=" mx-2" v-for="(field, index) in fields" :key="index">
                            <div style="font-size:10px;">{{ field.label }}</div>
                            <div v-html="item[field.key]"></div>
                        </div>
                    </div>
                    <fa :icon="icon.faGripLines" class="icon" />
                </div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import {
    faGripLines
} from '@fortawesome/free-solid-svg-icons'
import { json } from 'body-parser';
export default defineComponent({
    props: {
        items: {
            type: Array,
            required: true
        },
        fields: {
            type: Array() as Array<any>,
            default: [{key:'name', label: ''}]
        },
        fieldKey: {
            type: String,
            default: 'id'
        }
    },
    emits: ['ordered', 'number_click', 'text_click'],
    setup(props, { emit }) {
        const icon = {
            faGripLines: faGripLines
        }
        const listItems = ref(props.items as Array<any>)
        watch(() => props.items, (data) => {
            listItems.value = data
        }, { deep: true })

        let dragStartIndex = ref(0);


        function dragStart(e: any, index: any) {
            // console.log(index)
            // console.log('Event: ', 'dragstart');
            dragStartIndex.value = index;
        }

        function dragEnter(e: any) {
            // console.log('enter', e.target)
            // console.log('Event: ', 'dragenter');
            e.target.classList.add('over');
        }

        function dragLeave(e: any) {
            // console.log('Event: ', 'dragleave');
            e.target.classList.remove('over');
        }

        function dragOver(e: any) {
            // console.log('Event: ', 'dragover');
            e.preventDefault();
        }

        function dragDrop(e: any, index: any) {
            swapItems(dragStartIndex.value, index);
            e.target.classList.remove('over');
        }

        function textConvert(item: any) {
            var result = ''
            if (props.fields != undefined)
                props.fields.forEach((val: any) => {
                    result += item[val.key]
                })
            return result
        }

        // Swap list items that are drag and drop
        function swapItems(fromIndex: any, toIndex: any) {
            // console.log('from',fromIndex)
            // console.log('to',toIndex)
            var listeds = JSON.parse(JSON.stringify(listItems.value))
            listeds[fromIndex] = listItems.value[toIndex]
            listeds[toIndex] = listItems.value[fromIndex]
            if (fromIndex != toIndex) {
                listItems.value = listeds
                var payload = Array()
                listItems.value.forEach((val, index) => {
                    // console.log({ id: val.id, order: index + 1 })
                    payload.push({ id: val[props.fieldKey], order: index + 1 })
                })
                // console.log(listItems.value)
                // console.log(payload)
                emit('ordered', payload)
            }
        }

        return {
            listItems,
            dragStart,
            dragDrop,
            dragEnter,
            dragLeave,
            dragOver,
            textConvert,
            icon
        }
    },
})
</script>
<style>
:root {
    --border-color: #e3e5e4;
    --background-color: #c3c7ca;
    --text-color: #34444f;
}

.draggable-list {
    color: var(--text-color);
    padding: 0;
    list-style-type: none;
}

.draggable-list li {
    background-color: #fff;
    display: flex;
    flex: 1;
}

.draggable-list li:not(:last-of-type) {
    border-bottom: 2px solid var(--border-color);
}

.draggable-list .number {
    background-color: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    height: 40px;
    width: 40px;
}

.draggable-list .over {
    background-color: #eaeaea;
}

.draggable-list .person-name {
    margin: 0 5px 0 0;
}


.draggable {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
}
</style>