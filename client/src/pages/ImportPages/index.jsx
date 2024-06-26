import { useNavigate } from "react-router-dom"
import Page from "../../components/Page"
import Button from "../../ui/Button"
import Wrapper from "../../ui/Wrapper"
import { useSelector } from "react-redux"

const ImportPage = (props) => {
    const navigate = useNavigate()
    return <Page hasNav>
        <Wrapper wrap align="center" justify="around" fullPageOptions={{ hasNav: true }}>
            <Button onClick={() => {
                navigate('students', { relative: "path" })
            }} styleType="active" size="large">Импорт студентов и групп</Button>
            <Button onClick={() => {
                navigate('teachers', { relative: "path" })
            }} size="large">Импорт преподавателей</Button>
        </Wrapper>

    </Page>
}
export default ImportPage