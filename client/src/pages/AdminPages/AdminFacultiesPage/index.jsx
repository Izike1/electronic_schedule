import { useCallback, useMemo, useState } from "react"
import Page from "../../../components/Page"
import Wrapper from "../../../ui/Wrapper"
import Container from "../../../ui/Container"
import FacultyCard from "../../../components/FacultyCard"
import EmptyFaculty from "../../../components/FacultyCard/EmptyFaculty"
import Modal from "../../../ui/Modal"
import FormCreateFaculty from "../../../forms/FormCreateFaculty/FormCreateFaculty"
import Button from "../../../ui/Button"
import FormGetUniversityAnalize from "../../../forms/FormGetUniversityAnalize"
import { useSelector } from "react-redux"
import { FacultyService } from "../../../api/FacultyService"
import { useFetch } from "../../../hooks/useFetch"
import Loading from "../../../ui/Loading"

const AdminFacultiesPage = (props) => {
    const [facultiesData, isLoading, error, setFacultiesData] = useFetch(FacultyService.getFaculties)
    const faculties = useMemo(() => facultiesData?.data, [facultiesData])
    const setFaculties = useCallback((faculties) => {
        setFacultiesData((prev) => {
            return { ...prev, data: faculties }
        })

    }, [setFacultiesData])
    const [activeModal, setActiveModal] = useState(false)
    const [activeAnalizeModal, setActivAnalizeeModal] = useState(false)
    const auth = useSelector(({ authReducer }) => authReducer)

    const createFaculty = (id, name) => {
        setFaculties((p) => [...p, { id, name }])
    }

    return <Page hasNav>

        <Modal isActive={activeAnalizeModal} setIsActive={setActivAnalizeeModal}>
            <FormGetUniversityAnalize />
        </Modal>
        <Modal isActive={activeModal} setIsActive={setActiveModal}>
            <FormCreateFaculty onSuccess={(data) => {
                setActiveModal(false)
                createFaculty(data.id, data.name)
            }}>

            </FormCreateFaculty>
        </Modal>
        <Container>
            <Wrapper verticalMargin>
                <Button onClick={() => setActivAnalizeeModal(true)} styleType="active">Аналитика по ВУЗу</Button>
            </Wrapper>
            <Wrapper verticalMargin justify="between">
                {isLoading || !faculties ? <Wrapper fullPageOptions={{ hasNav: true }} justify="center" align="center">
                    <Loading size="large"></Loading>
                </Wrapper> : <>
                    {console.log(faculties)}
                    {faculties.map((faculty) => {
                        return <FacultyCard key={faculty.id} faculty={faculty}></FacultyCard>
                    })}
                    {auth.user.role === 'admin' &&
                        <EmptyFaculty onClick={() => {
                            setActiveModal(true)
                        }} />
                    }
                </>
                }

            </Wrapper>
        </Container>

    </Page>
}
export default AdminFacultiesPage