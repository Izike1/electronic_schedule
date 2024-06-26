import { useCallback, useMemo, useState } from 'react'
import Page from '../../../components/Page'
import Modal from '../../../ui/Modal'
import FormCreateGroup from '../../../forms/FormCreateGroup'
import { useNavigate, useParams } from 'react-router-dom'
import Wrapper from '../../../ui/Wrapper'
import GroupCard from '../../../components/GroupCard'
import Container from '../../../ui/Container'
import SearchInput from '../../../ui/SearchInput'
import FixedButton from '../../../ui/FixedButton'
import ModalForm from '../../../forms/ModalForm'
import Button from '../../../ui/Button'
import AdminPanelFaculty from '../../../forms/AdminPanelFaculty'
import { useFetch } from '../../../hooks/useFetch'
import { FacultyService } from '../../../api/FacultyService'
import Loading from '../../../ui/Loading'
import { GroupService } from '../../../api/GroupService'
import { toast } from 'react-toastify'

const AdminGroupsPage = (props) => {

    const [activeDeletePrompt, setActiveDeletePrompt] = useState(false)
    const [activeCreateModal, setActiveCreateModal] = useState(false)
    const [deleteFocus, setDeleteFocus] = useState(null)
    const [searchVal, setSearchVal] = useState('')
    const { id: facultyId } = useParams()

    const naviage = useNavigate()

    const fetchGroups = useCallback(async () => {
        return await FacultyService.getGroupsByFactulty(facultyId)
    }, [facultyId])
    const fetchFacultyInfo = useCallback(async () => {
        return await FacultyService.getFacultyInfo(facultyId)
    }, [facultyId])
    const [groupsRes, isLoading, , setGroupsRes] = useFetch(fetchGroups)
    const [facultyInfo, isLoadingFaculty, , setFacultyInfo] = useFetch(fetchFacultyInfo)
    const groups = useMemo(() => groupsRes?.data || [], [groupsRes])
    const facultyName = useMemo(() => facultyInfo?.data?.name, [facultyInfo])
    const setFacultyName = useCallback((name) => {
        if (typeof name === 'function') {
            setFacultyInfo((prev) => {
                return { ...prev, data: { ...prev.data, name: name(prev.data.name) } }
            })
        } else {
            setFacultyInfo((prev) => {
                return { ...prev, data: { ...prev.data, name } }
            })
        }


    }, [setFacultyInfo])
    const setGroups = useCallback((groups) => {
        if (typeof groups === 'function') {
            setGroupsRes((prev) => {
                return { ...prev, data: groups(prev.data) }
            })
        } else {
            setGroupsRes((prev) => {
                return { ...prev, data: groups }
            })
        }


    }, [setGroupsRes])
    const createGroup = (id, name) => {
        setGroups((p) => [...p, { id, name }])
    }
    const filtredGroups = useMemo(() => groups.filter((g) => {
        return g.name.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
    }), [groups, searchVal])

    return <Page hasNav bottomPadding>
        {isLoadingFaculty ? <Wrapper fullPageOptions={{ hasNav: true }} justify="center" align="center">
            <Loading size="large"></Loading>
        </Wrapper> :
            <>
                <AdminPanelFaculty facultyId={facultyId} facultyName={facultyName} onChangeFaculty={(name) => {
                    setFacultyName(name)
                }} onDeleteFaculty={
                    () => {
                        naviage('/admin/faculties')
                    }
                } />
                <Container>
                    {isLoading ?
                        <Wrapper justify="center" align="center">
                            <Loading size="large"></Loading>
                        </Wrapper>

                        : <>
                            <Wrapper verticalMargin> <SearchInput value={searchVal} onChange={(e) => setSearchVal(e.target.value)} /></Wrapper>
                            {filtredGroups.length > 0 ? <>


                                <Wrapper verticalMargin direaction='col'>
                                    {filtredGroups.map((g) => {
                                        return <GroupCard isAdmin removeBtn onRemove={() => {
                                            setDeleteFocus(g)
                                            setActiveDeletePrompt(true)
                                        }} key={g.id} name={g.name} id={g.id} />
                                    })}
                                </Wrapper>
                            </>
                                : <Wrapper verticalMargin fullPageOptions={{ hasNav: true }} justify='center' align='center'>
                                    <span>
                                        {'Таких групп пока что нет : ('}
                                    </span>
                                </Wrapper>
                            }
                        </>
                    }

                </Container>
                <FixedButton onClick={() => {
                    setActiveCreateModal(true)
                }} tooltip='Здесь можно создавать новые группы' />
                <Modal isActive={activeDeletePrompt && deleteFocus} setIsActive={setActiveDeletePrompt}>
                    <ModalForm>
                        <Wrapper direaction="col" justify="between" wrap={false} >
                            <span>Вы уверенны что хотите удалить группу: {deleteFocus?.name || 'Неизвестно'}?</span>
                            <Wrapper justify='around' verticalMargin>
                                <Button size="medium" styleType="warning" onClick={(e) => {
                                    e.preventDefault()
                                    const promise = GroupService.deleteGroup(deleteFocus.id)
                                    toast.promise(promise, {
                                        pending: "Удаление",
                                        success: "Успешно удалено"
                                    })
                                    setActiveDeletePrompt(false)
                                    setDeleteFocus(null)
                                    promise.then(() => {
                                        setGroups((p) => {
                                            return p.filter((g) => g.id !== deleteFocus?.id)
                                        })
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

                <Modal setIsActive={setActiveCreateModal} isActive={activeCreateModal} >

                    <FormCreateGroup facultyId={facultyId} onSuccess={(data) => {
                        setActiveCreateModal(false)
                        createGroup(data.id, data.name)
                    }} />
                </Modal>

            </>}

    </Page>
}
export default AdminGroupsPage