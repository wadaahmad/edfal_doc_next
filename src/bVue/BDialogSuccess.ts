import { BDialog } from "./BDialog"

export async function BDialogSuccess(content: string = 'Congratulations the process is done.', title: string = 'Success.!') {
    const loading = '<div class="bg-light text-center"><div class="p-5"><div class="success-checkmark"><div class="check-icon"><span class="icon-line line-tip"></span><span class="icon-line line-long"></span><div class="icon-circle"></div><div class="icon-fix"></div></div></div></div><h5 class="text-center">' + title + '</h5>' + content + '</div>'
    const dialog = await BDialog(loading, '', { hide_header: true, hide_footer: true, prevent_close: true })
    async function show() {
        dialog.show()
    }
    async function hide(){
        dialog.hide()
    }
    return {
        show,
        hide
    }
}
