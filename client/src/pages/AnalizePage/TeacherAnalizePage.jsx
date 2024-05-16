import { useState } from "react"
import Page from "../../components/Page"
import Container from "../../ui/Container"
import Wrapper from "../../ui/Wrapper"
import SearchInput from "../../ui/SearchInput"
import LessonList from "./LessonList"

const TeacherAnalizePage = (props) => {
    const [searchVal, setSearchVal] = useState('')
    return <Page hasNav>
        <Container>
            <Wrapper verticalMargin direaction="col">
                <SearchInput onChange={(e) => {
                    setSearchVal(e.target.value)
                }} />
                <LessonList searchVal={searchVal} />
            </Wrapper>
        </Container>

    </Page>
}
export default TeacherAnalizePage