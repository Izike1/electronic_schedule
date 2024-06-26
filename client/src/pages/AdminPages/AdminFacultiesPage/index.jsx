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
    const [facultiesData, isLoading, , setFacultiesData] = useFetch(FacultyService.getFaculties)
    const faculties = useMemo(() => facultiesData?.data, [facultiesData])
    const setFaculties = useCallback((faculties) => {
        if (typeof faculties === 'function') {
            setFacultiesData((prev) => {
                return { ...prev, data: faculties(prev.data) }
            })
        } else {
            setFacultiesData((prev) => {
                return { ...prev, data: faculties }
            })
        }

    }, [setFacultiesData])
    const [activeModal, setActiveModal] = useState(false)

    const auth = useSelector(({ authReducer }) => authReducer)

    const createFaculty = (id, name) => {
        setFaculties((p) => [...p, { id, name }])
    }

    return <Page hasNav>

        <Modal isActive={activeModal} setIsActive={setActiveModal}>
            <FormCreateFaculty onSuccess={(data) => {
                setActiveModal(false)
                createFaculty(data.id, data.name)
            }}>

            </FormCreateFaculty>
        </Modal>
        <Container>
            <Wrapper verticalMargin justify="between">
                {isLoading || !faculties ? <Wrapper fullPageOptions={{ hasNav: true }} justify="center" align="center">
                    <Loading size="large"></Loading>
                </Wrapper> : <>
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