import { useState } from "react"
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

const AdminFacultiesPage = (props) => {
    const [faculties, setFaculties] = useState(([{
        id: 1,
        name: 'Институт информатики математики и физики (ИПИМИФ)'
    }, {
        id: 2,
        name: 'Name'
    }, {
        id: 3,
        name: 'Key'
    }, {
        id: 4,
        name: 'Name'
    }, {
        id: 5,
        name: 'NameS'
    }]))
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

                {faculties.map((faculty) => {
                    return <FacultyCard key={faculty.id} faculty={faculty}></FacultyCard>
                })}
                {auth.user.role === 'admin' &&
                    <EmptyFaculty onClick={() => {
                        setActiveModal(true)
                    }} />
                }
            </Wrapper>
        </Container>

    </Page>
}
export default AdminFacultiesPage