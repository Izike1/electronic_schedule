import { useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AuthActionCreators } from "../redux/auth/action-creator"
import Wrapper from "../ui/Wrapper"
import Loading from "../ui/Loading"

const AuthContainer = ({ children, ...props }) => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector(({ authReducer }) => authReducer)
    const loadingRef = useRef(isLoading)
    useMemo(async () => {
        if (localStorage.getItem('token') && !loadingRef.current) {
            loadingRef.current = true
            await dispatch(AuthActionCreators.checkAuth())
            loadingRef.current = false
        }
    }, [dispatch, loadingRef])
    if (isLoading) {
        return <Wrapper justify="center" align="center" fullPageOptions={{ hasNav: false }}>
            <Loading size="large" />
        </Wrapper>
    }
    return <>
        {children}
    </>

}
export default AuthContainer