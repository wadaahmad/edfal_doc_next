import { BDialog } from "./BDialog"

export async function BDialogLoading(content: string = 'Please wait', title: string = 'Loading...') {
    const loading = '<div class="bg-light text-center"><div style="height:250px;"><div class="mesh-loader"><div class="set-one"><div class="circle bg-warning"></div><div class="circle bg-info"></div></div><div class="set-two"><div class="circle bg-secondary"></div><div class="circle bg-primary"></div></div></div></div><h5 class="text-center">' + title + '</h5>' + content + '</div>'
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
