import { useCallback, useMemo, useState } from 'react'
import Page from '../../components/Page'
import Wrapper from '../../ui/Wrapper'
import GroupCard from '../../components/GroupCard'
import Container from '../../ui/Container'
import SearchInput from '../../ui/SearchInput'
import { FacultyService } from '../../api/FacultyService'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import Loading from '../../ui/Loading'

const GroupsPage = (props) => {
    const { id: facultyId } = useParams()
    const [searchVal, setSearchVal] = useState('')

    const fetchGroups = useCallback(async () => {
        return await FacultyService.getGroupsByFactulty(facultyId)
    }, [facultyId])

    const [groupsRes, isLoading, error] = useFetch(fetchGroups)
    const groups = useMemo(() => groupsRes?.data || [], [groupsRes])

    const filtredGroups = useMemo(() => groups.filter((g) => {
        return g.name.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
    }), [groups, searchVal])
    if (isLoading) {
        return <Wrapper align='center' fullPageOptions={{ hasNav: true }}>
            <Loading size="large"></Loading>
        </Wrapper>
    }
    if (isLoading) {
        return <Wrapper align='center' fullPageOptions={{ hasNav: true }}>
            <Loading size="large"></Loading>
        </Wrapper>
    }

    if (error) {
        return <Wrapper align='center' direaction='col' justify='center' children_margin fullPageOptions={{ hasNav: true }}>
            <span>{'Ошибка : ('}</span>
        </Wrapper>
    }
    return <Page hasNav>
        <Container>
            <Wrapper verticalMargin> <SearchInput value={searchVal} onChange={(e) => setSearchVal(e.target.value)} /></Wrapper>
            {filtredGroups.length > 0 ? <>


                <Wrapper verticalMargin direaction='col'>
                    {filtredGroups.map((g) => {
                        return <GroupCard facultyId={facultyId} key={g.id} name={g.name} id={g.id} />
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

    </Page>
}
export default GroupsPage