import { useCallback, useMemo, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import classes from './attendance-table.module.scss'
import Loading from '../../ui/Loading'
import SelectAttendance from '../SelectAttendance'
import VerifyBlock from './VerifyBlock'
import Wrapper from '../../ui/Wrapper'
import { AttendanceService } from '../../api/AttendanceService'
import { useSelector } from 'react-redux'

const AttendanceTable = ({ groupId, date }) => {

    const { user } = useSelector(({ authReducer }) => authReducer)

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
    const fetchTable = useCallback(async () => {
        if (isTwomorrow) return Promise.reject('Date Error')
        return await AttendanceService.getAttendance(groupId, date)
    }, [date, groupId, isTwomorrow])
    const [data, isLoading, error] = useFetch(fetchTable)
    const dataTable = useMemo(() => data?.data || null, [data])
    const timelines = useMemo(() => {
        if (!dataTable) {
            return []
        }
        const schedules = {}
        const tlines = []
        dataTable.schedules.forEach((l) => {
            if (!(new Date(l.date).getTime() in schedules)) {
                schedules[new Date(l.date).getTime()] = []
            }
            schedules[new Date(l.date).getTime()].push([l.lessonName, l.type, l.additional])
        })
        for (let time in schedules) {
            tlines.push({
                time: +time,
                lessons: schedules[time]
            })
        }
        return tlines
    }, [dataTable])

    const colSpans = useMemo(() => {

        const colSpans = {
            totalCount: 0,
            timelines: []
        }
        if (!timelines?.length) {
            return colSpans
        }
        colSpans.timelines = timelines.map((timeline) => {
            colSpans.totalCount += timeline?.lessons?.length
            return timeline?.lessons?.length
        })
        return colSpans
    }, [timelines])

    const lessons = useMemo(() => {
        if (!dataTable) {
            return null
        }
        const lessons = dataTable?.schedules
        setVerified(lessons.map(l => (l.userInfo === 'unknown' || !l.userInfo) ? null : l.userInfo))
        lessons.forEach((l) => {
            l.info = [l.lessonName, l.type, l.additional]
        })
        return lessons
    }, [dataTable])

    const students = useMemo(() => {
        if (!dataTable) {
            return null
        }
        return dataTable.students.sort((a, b) => {
            const info1 = a.User_info
            const info2 = b.User_info
            let last = info1.last_name.localeCompare(info2.last_name)
            if (last !== 0) {
                return last
            }
            let first = info1.first_name.localeCompare(info2.first_name)
            return first
        })
    }, [dataTable])
    const attendances = useMemo(() => {
        const res = {}
        if (!dataTable?.attendances) {
            return res
        }
        for (let attendances of dataTable.attendances) {
            if (!attendances) {
                continue
            }
            for (let attendance of attendances) {
                if (!attendance) {
                    continue
                }
                const userId = attendance.UserId
                const scheduleId = attendance.ScheduleId
                if (!(userId in res)) {
                    res[userId] = {}
                }
                if (!(scheduleId in res[userId])) {
                    res[userId][scheduleId] = attendance.status
                }
            }

        }
        return res
    }, [dataTable])

    if (error || isTwomorrow) {
        return <Wrapper direaction='col' children_margin fullPageOptions={{ hasNav: true }} justify='center' align='center'>
            <span>{'Ошибка :('}</span>
            {isTwomorrow && <span>Вы не можете получить успеваемость на следующие дни!</span>}
        </Wrapper>
    }
    if (isLoading) {
        return <Wrapper fullPageOptions={{ hasNav: true }} justify='center' align='center'><Loading size="large" /></Wrapper>
    }
    if (data && timelines && (colSpans === null || colSpans.totalCount <= 0)) {
        return <Wrapper fullPageOptions={{ hasNav: true }} justify='center' align='center'>{'Выходной : )'}</Wrapper>
    }
    return <div className={classes.wrap}>
        {timelines && lessons && students && attendances && <table className={classes.main}>
            <thead>
                <tr>
                    <th rowSpan={3}>Студенты</th>
                    {/* <th colSpan={colSpans.totalCount}>{DayById[new Date(data.day).getDay()]} {new Date(data.day).toLocaleDateString()}</th> */}
                </tr>
                <tr>
                    {timelines.map((timeline, i) => {

                        return <th key={timeline.time} colSpan={colSpans.timelines[i]}>{String(new Date(timeline.time).getHours()).padStart(2, '0') + ':' + String(new Date(timeline.time).getMinutes()).padStart(2, '0')}</th>
                    })}
                </tr>
                <tr>
                    {
                        lessons.map((l) => {
                            return <th key={l.info.join(' ') + l.date}>
                                <div className={classes.lesson_name}>
                                    {l.info.map((info) => <span key={info}>
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
                    const sInfo = s.User_info
                    const fullName = `${sInfo.last_name} ${sInfo.first_name.slice(0, 1)}.${sInfo.middle_name ? ` ${sInfo.middle_name.slice(0, 1)}.` : ''}`
                    return <tr key={s.id}>
                        <td className={classes.left_col}>{fullName}</td>
                        {lessons.map((l, lessonIndex) => {
                            let status = 'unknown'

                            if (attendances[s.id] && attendances[s.id][l.id]) {
                                status = attendances[s.id][l.id]

                            }
                            return <td key={s.id + ' ' + l.id + Number(l.date)}>
                                <SelectAttendance schedule={l.id} student={s.id} hintPos={(students.length / 2 > studentIndex) ? 'bottom' : 'top'}
                                    fixed={verified[lessonIndex] !== null || (user.role !== 'admin' && user.role !== 'teacher' && user.role !== 'headman')}
                                    value={
                                        status
                                    } />
                            </td>
                        })}
                    </tr>
                })}
                <tr>
                    <td className={classes.left_col} >Подпись</td>
                    {lessons.map((l, i) => {
                        return <td key={l.info.join(' ') + l.date}>
                            <VerifyBlock schedule={l.id} onChange={(e) => {
                                if (e.type === 'unset') {
                                    setVerified((prev) => {
                                        const clone = [...prev]
                                        clone[i] = null
                                        return clone
                                    })
                                } else {
                                    setVerified((prev) => {
                                        const clone = [...prev]
                                        console.log(l)
                                        clone[i] = e.userInfo
                                        return clone
                                    })
                                }
                            }} verifiedBy={verified[i]}></VerifyBlock>
                        </td>
                    })}
                </tr>
            </tbody>
        </table>
        }
    </div >
}
export default AttendanceTable