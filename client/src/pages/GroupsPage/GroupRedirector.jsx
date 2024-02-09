import { useEffect } from "react"
import Wrapper from "../../ui/Wrapper"
import { useNavigate } from "react-router-dom"
import Loading from "../../ui/Loading"
import { GroupService } from "../../api/GroupService"

const GroupRedirector = () => {
    const navigate = useNavigate()
    useEffect(() => {
        let ignore = false
        GroupService.getSelfGroup().then((res) => {
            if (!ignore) {
                navigate(`${res?.data?.id}`)
            }
        })
        return () => {
            ignore = true
        }

    }, [navigate])
    return <Wrapper justify="center" align="center" fullPageOptions={{ hasNav: true }}>
        <Loading size="large"></Loading>
    </Wrapper>
}
export default GroupRedirector