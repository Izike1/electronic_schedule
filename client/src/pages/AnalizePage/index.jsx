import { useNavigate } from "react-router-dom"
import Page from "../../components/Page"
import Button from "../../ui/Button"
import Wrapper from "../../ui/Wrapper"

const AnalizePage = (props) => {
    const navigate = useNavigate()
    return <Page hasNav>
        <Wrapper wrap align="center" justify="around" fullPageOptions={{ hasNav: true }}>
            <Button onClick={() => {
                navigate('common', { relative: "path" })
            }} styleType="active" size="large">Общая аналитика</Button>
            <Button onClick={() => {
                navigate('subjects', { relative: "path" })
            }} size="large">Аналитика для преподавателей</Button>
        </Wrapper>

    </Page>
}
export default AnalizePage