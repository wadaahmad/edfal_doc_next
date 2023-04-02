import { useRef } from "react";
var $bootstrap: any
if (typeof window !== 'undefined')
    $bootstrap = require('bootstrap')
    
interface option {
    hide_header: boolean,
    hide_footer: boolean,
    prevent_close: boolean
}
export async function BDialog(content: string = '', title: string = 'Confirmation', option?: option) {

    const modalElement = document.createElement("div")
    modalElement.setAttribute("class", "modal fade");
    if (option?.prevent_close) {
        modalElement.setAttribute("data-bs-backdrop", "static");
        modalElement.setAttribute("data-bs-keyboard", "false");
        modalElement.setAttribute("tabindex", "-1");
    }
    modalElement.setAttribute("id", "msgbox");
    const modalDialog = document.createElement("div")
    modalDialog.setAttribute("class", "modal-dialog modal-dialog-centered modal-sm");

    const modalContent = document.createElement("div")
    modalContent.setAttribute("class", "modal-content");

    const modalHeader = document.createElement("div")
    modalHeader.setAttribute("class", "modal-header")
    modalHeader.innerHTML = title

    const modalBody = document.createElement("div")
    modalBody.setAttribute("class", "modal-body");
    modalBody.innerHTML = content

    const modalFooter = document.createElement("div")
    modalFooter.setAttribute("class", "modal-footer");
    modalFooter.innerHTML = '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>'

    if (!option?.hide_header)
        modalContent.appendChild(modalHeader)

    modalContent.appendChild(modalBody)

    if (!option?.hide_footer)
        modalContent.appendChild(modalFooter)

    modalDialog.appendChild(modalContent)
    modalElement.appendChild(modalDialog)

    var modal:any = new $bootstrap.Modal(modalElement, { backdrop: option?.prevent_close ? 'static' : true })

    modalElement.addEventListener('hidden.bs.modal', () => {
        modalElement.remove()
    })

    function show() {
        modal?.show()
        // console.log(modal.value)

    }

    function hide() {
        modal?._hideModal()
        // modal.value.hide()
        // console.log(modal.value.getInstance())
        // modal.value.hide()
        // console.log(modal.value.hide())
    }
    return {
        modal,
        modalElement,
        hide,
        show
    }
}
