import classes from './table.module.scss'
import { useMemo, useState } from 'react';
import SelectAttendance from '../SelectAttendance/index'
import { attendancesById } from '../../configs/Attendances';
import VerifyBlock from './VerifyBlock';
const MainTable = ({ onChangeTable = (data) => console.log(data), data }) => {
    const [fixedCols, setFixed] = useState([])
    const colSpans = useMemo(() => {
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
        const lessons = []
        data?.timelines?.forEach((timeline) => {
            timeline?.lessons?.forEach((l) => {
                lessons.push({ ...l, time: timeline.time })
            })
        })
        return lessons
    }, [data])
    return <div className={classes.wrap}>
        {
            colSpans.totalCount > 0 ? <table className={classes.main}>
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
                    {data.students.map((s, studentIndex) => {
                        const fullName = `${s.lastName} ${s.firstName.slice(0, 1)}.${s.middleName ? ` ${s.middleName.slice(0, 1)}.` : ''}`
                        return <tr key={fullName}>

                            <td className={classes.left_col}>{fullName}</td>
                            {s.states.map((state, stateIndex) => {
                                return <td key={fullName + lessons[stateIndex].name.join(' ') + lessons[stateIndex].time}>

                                    <SelectAttendance hintPos={(data.students.length / 2 > studentIndex) ? 'bottom' : 'top'}
                                        fixed={lessons[stateIndex].verifiedBy !== null}
                                        value={attendancesById[state]} onChange={(t) => {
                                            const data = {
                                                status: t,
                                                student: s,
                                                lesson: lessons[stateIndex]
                                            }

                                            onChangeTable({
                                                action: 'changeAttendace',
                                                data
                                            })
                                        }} />
                                </td>
                            })}
                        </tr>
                    })}
                    <tr>
                        <td className={classes.left_col} >Подпись</td>
                        {lessons.map((l) => {
                            return <td key={l.name.join(' ') + l.time}>
                                <VerifyBlock verifiedBy={l.verifiedBy}></VerifyBlock>
                            </td>
                        })}
                    </tr>
                </tbody>
            </table > : <span>Выходной</span>
        }
    </div>
}
export default MainTable