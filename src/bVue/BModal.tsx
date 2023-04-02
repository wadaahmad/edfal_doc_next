
import { classNames } from "@/helper/styleHelper"
import { ReactNode, useEffect, useRef, useState } from "react"
var $bootstrap: any
if (typeof window !== 'undefined')
    $bootstrap = require('bootstrap')

interface BModal {
    show: boolean,
    modelValue?: boolean,
    center?: boolean,
    title?: string,
    size?: string,
    hideFooter?: boolean,
    hideHeader?: boolean,
    children?: ReactNode,
    // 'show', 'ok', 'hide', 'hidden'
}
export default function BModal(props: BModal) {
    var size = 'modal-' + props.size ? props.size : ''
    var title = props.size ? props.size : ''
    var center = props.center ? props.center : false
    const modalId = Math.floor(Math.random() * 1000).toString() + '__bmodal'
    const modalElement = useRef()

    var modal = useRef()
    // var modal:any 

    const [open, setOpen] = useState(props.show || props.modelValue)

    useEffect(() => {
        modal.current = new $bootstrap.Modal(modalElement.current, { backdrop: true })
        console.log(modalElement.current)
        if (open){
            show()
            console.log('show')
        }
            
        modalElement.current?.addEventListener('hidden.bs.modal', () => {
            // emit('hidden')
            // emit('update:modelValue', false)
        })
    }, [])




    function hide() {
        console.log('hide')
        modal.current?.hide()
        // emit('update:modelValue', false)

    }
    function show() {
        console.log(modal.current)
        modal.current?.show()
        // emit('update:modelValue', true)

    }
    return (
        <div className="modal fade" ref={modalElement} id={modalId}>

            <div className={classNames({ 'modal-dialog': true, size: true, 'modal-dialog-centered': center })}>
                <div className="modal-content">

                    <div className="modal-header" v-if="!hideHeader">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={hide} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer" v-if="!hideFooter">
                        <button type="button" className="btn btn-secondary" data-backdrop="false" data-bs-dismiss="modal"  onClick={hide}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

