import { useEffect, useState } from "react"
import Wrapper from "../Wrapper"
import Loading from "../Loading"

const DelayShow = ({ children, time = 500, rerenderDep = null, ...props }) => {
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsActive(true)
        }, time)
        return () => {
            clearTimeout(timer)
            setIsActive(false)
        }
    }, [setIsActive, time, rerenderDep])
    return <>
        {!isActive ? <Wrapper align="center" justify="center" fullPageOptions={{ hasNav: true }}>
            <Loading size="large" />
        </Wrapper>
            : children}
    </>
}
export default DelayShow