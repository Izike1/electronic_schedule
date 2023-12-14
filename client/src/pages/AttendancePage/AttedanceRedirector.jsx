import { useEffect } from "react"
import Wrapper from "../../ui/Wrapper"
import { useNavigate } from "react-router-dom"
import Loading from "../../ui/Loading"

const AttendanceRedirector = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const currentDate = new Date()
        currentDate.setHours(0)
        currentDate.setMinutes(0)
        currentDate.setSeconds(0)
        currentDate.setMilliseconds(0)
        navigate(`${currentDate.getTime()}`)
    }, [navigate])
    return <Wrapper justify="center" align="center" fullPageOptions={{ hasNav: true }}>
        <Loading size="large"></Loading>
    </Wrapper>
}
export default AttendanceRedirector