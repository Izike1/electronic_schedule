import { useCallback, useMemo, useState } from 'react'
import { devFetchTable } from '../../api/Test/devFetchTable'
import { useFetch } from '../../hooks/useFetch'
import classes from './attendance-table.module.scss'
import Loading from '../../ui/Loading'
import { attendancesById } from '../../configs/Attendances'
import SelectAttendance from '../SelectAttendance'
import VerifyBlock from './VerifyBlock'
import Wrapper from '../../ui/Wrapper'

const AttendanceTable = ({ date, ...props }) => {

    const [verified, setVerified] = useState([])
    const isTwomorrow = useMemo(() => {
        let twomorrow = new Date()
        twomorrow.setDate(twomorrow.getDate() + 1)
        twomorrow.setHours(0)
        twomorrow.setMinutes(0)
        twomorrow.setSeconds(0)
        twomorrow.setMilliseconds(0)
        return twomorrow.getTime() <= Number(date)
    }, [date])
    const fetchTable = useCallback(() => {
        if (isTwomorrow) return Promise.reject('Date Error')
        return devFetchTable(date)
    }, [date, isTwomorrow])
    const [data, isLoading, error] = useFetch(fetchTable)
    const colSpans = useMemo(() => {
        if (!data) {
            return null
        }
        const colSpans = {
            totalCount: 0,
            timelines: []
        }
        colSpans.timelines = data.timelines.map((timeline) => {
            colSpans.totalCount += timeline?.lessons?.length
            return timeline?.lessons?.length
        })
        return colSpans
    }, [data])
    const lessons = useMemo(() => {
        if (!data) {
            return null
        }
        const lessons = []
        data?.timelines?.forEach((timeline) => {
            timeline?.lessons?.forEach((l) => {
                lessons.push({ ...l, time: timeline.time })
            })
        })
        setVerified(lessons.map(l => l.verifiedBy || null))
        return lessons
    }, [data])
    const students = useMemo(() => {
        if (!data) {
            return null
        }
        return data.students
    }, [data])
    return <div className={classes.wrap + isLoading ? (' ' + classes.loading_wrap) : ''}>
        {(error || isTwomorrow) ?
            <Wrapper direaction='col' children_margin fullPageOptions={{ hasNav: true }} justify='center' align='center'>
                <span>{'Ошибка :('}</span>
                {isTwomorrow && <span>Вы не можете получить успеваемость на завтра!</span>}
            </Wrapper> :
            isLoading ? <Wrapper fullPageOptions={{ hasNav: true }} justify='center' align='center'><Loading size="large" /></Wrapper> :
                data && <>
                    {colSpans.totalCount <= 0 ? 'Выходной' :
                        <table className={classes.main}>
                            <thead>
                                <tr>
                                    <th rowSpan={3}>Студенты</th>
                                    {/* <th colSpan={colSpans.totalCount}>{DayById[new Date(data.day).getDay()]} {new Date(data.day).toLocaleDateString()}</th> */}
                                </tr>
                                <tr>
                                    {data.timelines.map((timeline, i) => {
                                        return <th key={timeline.time} colSpan={colSpans.timelines[i]}>{timeline.time}</th>
                                    })}
                                </tr>
                                <tr>
                                    {
                                        lessons.map((l) => {
                                            return <th key={l.name.join(' ') + l.time}>
                                                <div className={classes.lesson_name}>
                                                    {l.name.map((info) => <span key={info}>
                                                        {info}
                                                    </span>
                                                    )}
                                                </div>
                                            </th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s, studentIndex) => {
                                    const fullName = `${s.lastName} ${s.firstName.slice(0, 1)}.${s.middleName ? ` ${s.middleName.slice(0, 1)}.` : ''}`
                                    return <tr key={fullName}>
                                        <td className={classes.left_col}>{fullName}</td>
                                        {s.states.map((state, stateIndex) => {
                                            return <td key={fullName + lessons[stateIndex].name.join(' ') + lessons[stateIndex].time}>

                                                <SelectAttendance hintPos={(students.length / 2 > studentIndex) ? 'bottom' : 'top'}
                                                    fixed={verified[stateIndex] !== null}
                                                    value={attendancesById[state]} />
                                            </td>
                                        })}
                                    </tr>
                                })}
                                <tr>
                                    <td className={classes.left_col} >Подпись</td>
                                    {lessons.map((l, i) => {
                                        return <td key={l.name.join(' ') + l.time}>
                                            <VerifyBlock onChange={(e) => {
                                                if (e.type === 'unset') {
                                                    setVerified((prev) => {
                                                        const clone = [...prev]
                                                        clone[i] = null
                                                        return clone
                                                    })
                                                } else {
                                                    setVerified((prev) => {
                                                        const clone = [...prev]
                                                        clone[i] = e.name
                                                        return clone
                                                    })
                                                }
                                            }} verifiedBy={verified[i]}></VerifyBlock>
                                        </td>
                                    })}
                                </tr>
                            </tbody>
                        </table>}
                </>}
    </div>
}
export default AttendanceTable