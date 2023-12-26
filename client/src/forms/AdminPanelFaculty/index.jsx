import { useState } from "react"
import AdminPanel from "../../components/AdminPanel"
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import Wrapper from "../../ui/Wrapper"
import FormEditFaculty from "../FormEditFaculty"
import ModalForm from "../ModalForm"
import classes from './admin-panel-faculty.module.scss'
import FormGetFacultyAnalize from "../FormGetFacultyAnalize"
const AdminPanelFaculty = ({ facultyName, facultyId, onChangeFaculty = () => { }, onDeleteFaculty = () => { }, ...props }) => {
    const [activeFormEdit, setActiveFormEdit] = useState(false)
    const [activeDeletePrompt, setActiveDeletePrompt] = useState(false)
    const [activeFormAnalize, setActiveFormAnalize] = useState(false)
    return <AdminPanel title={`Панель администратора ${facultyName}`}>
        <Modal isActive={activeFormEdit} setIsActive={setActiveFormEdit}>
            <FormEditFaculty onSuccess={(data) => {
                onChangeFaculty(data.name)
                setActiveFormEdit(false)
            }} facultyName={facultyName} />
        </Modal>
        <Modal isActive={activeDeletePrompt} setIsActive={setActiveDeletePrompt}>
            <ModalForm>
                <Wrapper direaction="col" justify="between" wrap={false} >
                    <span>Вы уверенны что хотите удалить факультет: {facultyName || 'Неизвестно'}?</span>
                    <Wrapper justify='around' verticalMargin>
                        <Button size="medium" styleType="warning" onClick={(e) => {
                            e.preventDefault()
                            setActiveDeletePrompt(false)
                            onDeleteFaculty()
                        }}>Удалить</Button>
                        <Button onClick={(e) => {
                            e.preventDefault()
                            setActiveDeletePrompt(false)
                        }} size="medium" >Отмена</Button>
                    </Wrapper>
                </Wrapper>
            </ModalForm>
        </Modal>
        <Modal isActive={activeFormAnalize} setIsActive={setActiveFormAnalize}>
            <FormGetFacultyAnalize />
        </Modal>
        <Wrapper wrap={false} classStr={classes.btn_wrapper} verticalMargin justify="start">
            <Wrapper style={{
                width: '100%'
            }} justify="center">
                <Button onClick={() => setActiveFormEdit(true)} styleType="active">Переименовать факультет</Button>
            </Wrapper>
            <Wrapper style={{
                width: '100%'
            }} justify="center">
                <Button onClick={() => setActiveFormAnalize(true)} styleType="active">Аналитика факультета</Button>
            </Wrapper>
            <Wrapper style={{
                width: '100%'
            }} justify="center">

                <Button onClick={() => setActiveDeletePrompt(true)} styleType="warning">Удалить факультет</Button>
            </Wrapper>

        </Wrapper>

    </AdminPanel>
}
export default AdminPanelFaculty