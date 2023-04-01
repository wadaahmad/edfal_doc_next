import { useState } from "react";

function reactive(initialState: any) {
    const [state, setState] = useState(initialState);
    const setMergedState = (newState: any) =>
        setState((prevState: any) => Object.assign({}, prevState, newState)
        );
    return [state, setMergedState];
}
export { reactive }