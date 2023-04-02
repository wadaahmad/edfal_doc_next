import {
    faGripLines
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
interface OrderableView {
    items: Array<any>,
    fields?: Array<any>,
    fieldKey?: string,
    ordered: (item:any) => Array<any>,
    number_click: (item:any) => any,
    text_click: (item:any) => any,
}
export default function OrderableView(props: OrderableView) {
    if (!props.fields)
        props.fields = [{ key: 'name', label: '' }]
    if (!props.fieldKey)
        props.fieldKey = 'id'
    const icon = {
        faGripLines: faGripLines
    }
    const [listItems, setListItems] = useState(props.items as Array<any>)
    // watch(() => props.items, (data) => {
    //     listItems.value = data
    // }, { deep: true })

    let [dragStartIndex, setDragStartIndex] = useState(0);


    function dragStart(e: any, index: any) {
        // console.log(index)
        // console.log('Event: ', 'dragstart');
        setDragStartIndex(index)
    }

    function dragEnter(e: any) {
        // console.log('enter', e.target)
        // console.log('Event: ', 'dragenter');
        e.target.classNameList.add('over');
    }

    function dragLeave(e: any) {
        // console.log('Event: ', 'dragleave');
        e.target.classNameList.remove('over');
    }

    function dragOver(e: any) {
        // console.log('Event: ', 'dragover');
        e.preventDefault();
    }

    function dragDrop(e: any, index: any) {
        swapItems(dragStartIndex, index);
        e.target.classNameList.remove('over');
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
        var listeds = JSON.parse(JSON.stringify(listItems))
        listeds[fromIndex] = listItems[toIndex]
        listeds[toIndex] = listItems[fromIndex]
        if (fromIndex != toIndex) {
            setListItems(listeds)
            var payload = Array()
            listItems.forEach((val, index) => {
                // console.log({ id: val.id, order: index + 1 })
                if (props.fieldKey)
                    payload.push({ id: val[props.fieldKey], order: index + 1 })
            })
            // console.log(listItems.value)
            // console.log(payload)
            props.ordered(payload)
        }
    }
    return (
        <ul className="draggable-list" id="draggable-list">
            {
                listItems.map((item, index) => (
                    <li className="mb-1" onDragOver={dragOver}
                        onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={(e) => dragDrop(e, index)} >
                        <span className="number" onClick={props.number_click(item)}>{index + 1}</span>
                        <div className="draggable" draggable onClick={props.text_click(item)} onDragStart={(e) => dragStart(e, index)}  >
                            <div className="person-name d-flex">
                                {
                                    props.fields?.map((field, index) => (
                                        <div className=" mx-2" >
                                            <div style={{ fontSize: '10px' }}>{field.label}</div>
                                            <div v-html="item[field.key]"></div>
                                        </div>
                                    ))
                                }
                            </div >
                            <FontAwesomeIcon icon={icon.faGripLines} className="icon" />
                        </div >
                    </li >
                ))
            }

        </ul >
    )
}

