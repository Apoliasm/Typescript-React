import { useCallback, useEffect, useState } from "react"

const RenderFunctionalComp:React.FC = () =>{
    console.log('[Functional] Beginning')
    const [value,setValue] = useState(0);
    useEffect(() => {
        console.log('[Functional] useEffect []')

    }, [])

    useEffect(() => {
        console.log('[Functional] useEffect Value')
        return () => {
            console.log('value clean up ')
        }
    },[value]);

    console.log('End')
    const resetValue = useCallback(()=> {
        console.log('callback call')
        setValue(0);
    }, [])

    return(
        <div>
            <h1>value : {value} </h1>
            <button onClick={() => {setValue(value+1)}} > Increase Button</button>
            <button onClick={() => {resetValue()}}> Reset Button</button>
        </div>
    )
}

export default RenderFunctionalComp