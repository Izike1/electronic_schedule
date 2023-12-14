import { useNavigate, useParams } from "react-router-dom"
import Page from "../../components/Page"
import Container from "../../ui/Container"
import DateSlider from "../../components/DateSlider"
import Wrapper from "../../ui/Wrapper"
import { useCallback } from "react"
import DelayShow from "../../ui/DelayShow"
import TestRender from "../../components/TestRender"

const AttendancePage = () => {
    const { id: groupId, date } = useParams()
    const navigate = useNavigate()
    const onChangeDate = useCallback((val) => {
        if (`${val}` !== date) {
            navigate(`/groups/${groupId}/${val}`)
        }

    }, [navigate, groupId, date])
    return <Page hasNav>
        <Container>
            {groupId}
            <br />
            <Wrapper verticalMargin>
                <DateSlider onChange={onChangeDate} defaultDate={Number(date)} />
            </Wrapper>
            <DelayShow rerenderDep={date}>
                <TestRender />
            </DelayShow>
        </Container>

    </Page>
}
export default AttendancePage