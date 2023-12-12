import { useState } from "react"
import Page from "../../components/Page"
import Wrapper from "../../ui/Wrapper"
import Container from "../../ui/Container"
import FacultyCard from "../../components/FacultyCard"
import EmptyFaculty from "../../components/FacultyCard/EmptyFaculty"
import Modal from "../../ui/Modal"
import FormCreateFaculty from "../../forms/FormCreateFaculty/FormCreateFaculty"
import { useAuth } from "../../hooks/useAuth"
import FixedButton from "../../ui/FixedButton"

const FacultiesPage = (props) => {
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
    const auth = useAuth()
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
        <FixedButton onClick={() => console.log('clicked')}></FixedButton>
        <Container>
            <Wrapper verticalMargin justify="between">

                {faculties.map((faculty) => {
                    return <FacultyCard key={faculty.id} faculty={faculty}></FacultyCard>
                })}
                {auth.role === 'admin' &&
                    <EmptyFaculty onClick={() => {
                        setActiveModal(true)
                    }} />
                }
            </Wrapper>
        </Container>

    </Page>
}
export default FacultiesPage