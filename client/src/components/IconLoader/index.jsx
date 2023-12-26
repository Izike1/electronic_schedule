import { useEffect, useState } from "react"
import Wrapper from "../../ui/Wrapper"
import Loading from "../../ui/Loading"

const IconLoader = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (!document.fonts) {
            setIsLoading(false)
        }
        document.fonts.load('1em Material Symbols Outlined').then(() => setIsLoading(false))
    }, [])
    if (isLoading) {
        return <Wrapper justify="center" align="center" fullPageOptions={{ hasNav: false }}>
            <Loading size="large"></Loading>
        </Wrapper>
    }
    return <>
        {children}
    </>
}
export default IconLoader