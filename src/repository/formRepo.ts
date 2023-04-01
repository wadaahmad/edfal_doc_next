
function objectToFormData(object?: Object) {
    var formData = new FormData()
    if (object) {
        Object.entries(object).forEach((data) => {
            if (Array.isArray(data[1])) {
                data[1].forEach((value, index) => {
                    formData.append(data[0] + "[]", value)
                })
            } else {
                formData.append(data[0], data[1])
            }
        })
    }
    return formData
}
export default { objectToFormData }