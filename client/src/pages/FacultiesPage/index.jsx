import { useState } from "react"
import Page from "../../components/Page"
import Wrapper from "../../ui/Wrapper"
import Container from "../../ui/Container"
import FacultyCard from "../../components/FacultyCard"
import { useFetch } from "../../hooks/useFetch"
import { FacultyService } from "../../api/FacultyService"
import Loading from "../../ui/Loading"

const FacultiesPage = (props) => {
    const [faculties, isLoading] = useFetch(FacultyService.getFaculties)
    return <Page hasNav>
        <Container>
            {isLoading ? <Wrapper fullPageOptions={{ hasNav: true }} justify="center" align="center">
                <Loading size="large"></Loading>
            </Wrapper>
                : (faculties?.data && <Wrapper verticalMargin justify="between">

                    {faculties.data.map((faculty) => {
                        return <FacultyCard key={faculty.id} faculty={faculty}></FacultyCard>
                    })}
                </Wrapper>)}

        </Container>

    </Page>
}
export default FacultiesPage