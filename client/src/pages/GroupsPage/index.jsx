import { useMemo, useState } from 'react'
import Page from '../../components/Page'
import Modal from '../../ui/Modal'
import FormCreateGroup from '../../forms/FormCreateGroup'
import { useParams } from 'react-router-dom'
import Wrapper from '../../ui/Wrapper'
import GroupCard from '../../components/GroupCard'
import Container from '../../ui/Container'
import SearchInput from '../../ui/SearchInput'
import FixedButton from '../../ui/FixedButton'
import ModalForm from '../../forms/ModalForm'
import Button from '../../ui/Button'
const GroupsPage = (props) => {
    const [activeDeletePrompt, setActiveDeletePrompt] = useState(false)
    const [activeCreateModal, setActiveCreateModal] = useState(false)
    const [deleteFocus, setDeleteFocus] = useState(null)
    const [searchVal, setSearchVal] = useState('')
    const { id: facultyId } = useParams()

    const [groups, setGroups] = useState([{
        id: 1,
        name: 'Name'
    },
    {
        id: 2,
        name: 'ВМ-ИВТ-2-1'
    },])
    const createGroup = (id, name) => {
        setGroups((p) => [...p, { id, name }])
    }
    const filtredGroups = useMemo(() => groups.filter((g) => {
        return g.name.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
    }), [groups, searchVal])
    return <Page hasNav>
        <Container>
            <Wrapper verticalMargin> <SearchInput value={searchVal} onChange={(e) => setSearchVal(e.target.value)} /></Wrapper>
            {filtredGroups.length > 0 ? <>


                <Wrapper verticalMargin direaction='col'>
                    {filtredGroups.map((g) => {
                        return <GroupCard removeBtn onRemove={() => {
                            console.log('click')
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
                            setActiveDeletePrompt(false)
                            setDeleteFocus(null)
                            setGroups((p) => {
                                return p.filter((g) => g.id !== deleteFocus?.id)
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
                setGroups((p) => [{
                    name: data.name,
                    id: data.id
                }, ...p])
            }} />
        </Modal>
    </Page>
}
export default GroupsPage