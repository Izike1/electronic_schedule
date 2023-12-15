import { useEffect } from "react"

const TestRender = (props) => {
    useEffect(() => {
        console.log('mount')
    }, [])
    return <></>
}
export default TestRender