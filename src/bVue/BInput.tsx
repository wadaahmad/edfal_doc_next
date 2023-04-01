import { useState } from "react"

interface BInput {
    modelValue: Number | String,
    label: String,
    invalid_message: String,
    value: Number | String,
}
export default function BInput(props: BInput) {
    const [value, setValue] = useState(props.value)
    function onChange(e: any) {
        setValue(e.target.value)
    }
    return (
        <div className="mb-2">
            <label v-if="label != undefined">{props.label}</label>
            <input type="text" v-bind="$attrs" value={value.toString()} onInput={onChange}
                className="form-control" />
            <div className="invalid-feedback">{props.invalid_message}</div>
        </div>
    )
}
