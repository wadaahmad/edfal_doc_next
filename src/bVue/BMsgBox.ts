import { BDialog } from "./BDialog"

export function msgBoxOk(content: string = '', title: string = 'Confirmation') {
    async function show() {
        (await BDialog(content, title)).show()
    }

    return {
        show
    }
}
