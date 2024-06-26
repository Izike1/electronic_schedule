import { useCallback, useMemo, useState } from "react"
import Page from "../../../components/Page"
import { useParams } from "react-router-dom"
import FixedButton from "../../../ui/FixedButton"
import Container from "../../../ui/Container"
import Modal from "../../../ui/Modal"
import ModalForm from "../../../forms/ModalForm"
import Wrapper from "../../../ui/Wrapper"
import Button from "../../../ui/Button"
import { toast } from "react-toastify"
import FormCreateStudent from "../../../forms/FormCreateStudent"
import { UserService } from "../../../api/UserService"
import { useFetch } from "../../../hooks/useFetch"
import Loading from "../../../ui/Loading"
import SearchInput from "../../../ui/SearchInput"
import StudentCard from "../../../components/StudentCard"
import FormEditStudent from "../../../forms/FormEditStudent"
const AdminStudentsPage = () => {
    const { id: groupId } = useParams()
    const [activeCreateModal, setActiveCreateModal] = useState(false)
    const [activeDeletePrompt, setActiveDeletePrompt] = useState(false)
    const [deleteFocus, setDeleteFocus] = useState(null)
    const [activeEditPrompt, setActiveEditPrompt] = useState(false)
    const [editFocus, setEditFocus] = useState(null)
    const [searchVal, setSearchVal] = useState('')
    const fetchGroup = useCallback(async () => {
        return await UserService.getStudentsInGroup(groupId)
    }, [groupId])

    const [groupRes, isLoading, , setGroupRes] = useFetch(fetchGroup)
    const group = useMemo(() => groupRes?.data || {}, [groupRes])
    const students = useMemo(() => group.Users || [], [group])
    const setGroup = useCallback((group) => {
        if (typeof group === 'function') {
            setGroupRes((prev) => {
                return { ...prev, data: group(prev.data) }
            })
        } else {
            setGroupRes((prev) => {
                return { ...prev, data: group }
            })
        }
    }, [setGroupRes])
    const setStudents = useCallback((students) => {
        if (typeof students === 'function') {
            setGroup((prev) => {
                return { ...prev, Users: students(prev.Users) }
            })
        } else {
            setGroup((prev) => {
                return { ...prev, Users: students }
            })
        }
    }, [setGroup])
    const addStudent = useCallback((student) => {
        setStudents((prev) => {
            return [...prev, student]
        })
    }, [setStudents])
    const removeStudent = useCallback((student) => {
        setStudents((prev) => {
            return prev.filter((s) => s.id !== student.id)
        })
    }, [setStudents])
    const changeStudent = useCallback((student) => {
        setStudents((prev) => {
            return prev.map((s) => {
                if (s.id !== student.id) {
                    return s
                }
                return student
            })
        })
    }, [setStudents])

    const filtredStudents = useMemo(() => {
        if (searchVal === '') {
            return students
        }
        return students.filter((s) => {
            return s?.User_info?.last_name?.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
        })
    }, [students, searchVal])
    const sortedStudents = useMemo(() => {
        return filtredStudents.slice().sort((a, b) => {
            if (a.User_info.last_name === b.User_info.last_name) {
                return a.User_info.first_name.localeCompare(b.User_info.first_name)
            }
            return a.User_info.last_name.localeCompare(b.User_info.last_name)
        })
    }, [filtredStudents])
    return <Page hasNav bottomPadding>
        {
            isLoading ? <Wrapper fullPageOptions={{ hasNav: true }} justify="center" align="center">
                <Loading size="large"></Loading>
            </Wrapper> : <>
                <Wrapper verticalMargin>Администрирование группы {group.name}</Wrapper>
                <Wrapper verticalMargin> <SearchInput value={searchVal} onChange={(e) => setSearchVal(e.target.value)} /></Wrapper>
                <Container>
                    {sortedStudents.length > 0 ? <>


                        <Wrapper verticalMargin direaction='col'>
                            {sortedStudents.map((s) => {
                                const { User_info: info } = s
                                let name = info.last_name + ' ' + info.first_name[0] + '. ' + (info.middle_name ? info.middle_name[0] + '.' : '')
                                return <StudentCard onRemove={() => {
                                    setDeleteFocus(s)
                                    setActiveDeletePrompt(true)
                                }} onEdit={() => {
                                    setEditFocus(s)
                                    setActiveEditPrompt(true)
                                }} key={s.id} name={name} id={s.id} />
                            })}
                        </Wrapper>
                    </>
                        : <Wrapper verticalMargin fullPageOptions={{ hasNav: true }} justify='center' align='center'>
                            <span>
                                {'Таких студентов пока что нет : ('}
                            </span>
                        </Wrapper>
                    }
                </Container>
            </>
        }
        <FixedButton onClick={() => {
            setActiveCreateModal(true)
        }} tooltip='Здесь можно добавлять студентов' />
        <Modal isActive={activeDeletePrompt && deleteFocus} setIsActive={setActiveDeletePrompt}>
            <ModalForm>
                <Wrapper direaction="col" justify="between" wrap={false} >
                    <span>Вы уверенны что хотите удалить студента: {(() => {
                        if (deleteFocus) {
                            const { User_info: info } = deleteFocus

                            let name = info.last_name + ' ' + info.first_name[0] + '. ' + (info.middle_name ? info.middle_name[0] + '.' : '')
                            return name
                        }

                    })() || 'Неизвестно'}?</span>
                    <Wrapper justify='around' verticalMargin>
                        <Button size="medium" styleType="warning" onClick={(e) => {
                            e.preventDefault()
                            const promise = UserService.deleteStudent(deleteFocus.id)
                            toast.promise(promise, {
                                pending: "Удаление",
                                success: "Успешно удалено"
                            })
                            setActiveDeletePrompt(false)
                            setDeleteFocus(null)
                            promise.then(() => {
                                removeStudent(deleteFocus)
                            }).catch(() => {
                                console.log('Ошибка удаления')
                            })

                        }}>Удалить</Button>
                        <Button onClick={(e) => {
                            e.preventDefault()
                            setActiveDeletePrompt(false)
                            setDeleteFocus(null)
                        }} size="medium" >Отмена</Button>
                    </Wrapper>
                </Wrapper>
            </ModalForm>
        </Modal>
        <Modal isActive={activeEditPrompt && editFocus} setIsActive={setActiveEditPrompt}>
            <FormEditStudent onSuccess={(data) => {
                const { lastName, firstName, middleName, id } = data
                changeStudent({
                    id, User_info: {
                        last_name: lastName,
                        first_name: firstName,
                        middle_name: middleName
                    }
                })
            }} studentId={editFocus?.id} lastName={editFocus?.User_info.last_name}
                firstName={editFocus?.User_info.first_name} middleName={editFocus?.User_info.middle_name} />
        </Modal>

        <Modal setIsActive={setActiveCreateModal} isActive={activeCreateModal} >

            <FormCreateStudent groupId={groupId} onSuccess={(data) => {
                setActiveCreateModal(false)
                addStudent(data)
            }} />
        </Modal>
        <Container>

        </Container>
    </Page>
}
export default AdminStudentsPage