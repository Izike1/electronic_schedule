import { Fragment, useCallback, useState, useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import attendances, { attendancesShortRu, attendancesColor } from '../../configs/Attendances'
import DelayRemove from '../../ui/DelayRemove'
import Hint from '../../ui/Hint'
import InputBlock from '../../ui/InputBlock'
import List from '../../ui/List'
import classes from './select.module.scss'
import Variant from './Variant'
import Loading from '../../ui/Loading'

import { AttendanceService } from '../../api/AttendanceService'

const SelectAttendance = ({ onChange, student = 1, schedule = 4, fixed = false, hintPos = 'bottom', value = null, ...props }) => {

    const [isHintActive, setHintActive] = useState(false)
    const ref = useRef(null)
    const [selected, setSelected] = useState(value)
    const isMobile = useIsMobile()
    const [isLoading, setIsLoading] = useState(false)
    const showHint = useCallback((e) => {
        if (fixed) {
            e.preventDefault()
            return
        }
        if (isMobile) {
            e.target.blur()
        }
        setHintActive(true)
    }, [isMobile, fixed])
    const hideHint = useCallback(() => {
        setHintActive(false)
    }, [])

    const handleSelect = useCallback((type) => {
        setHintActive(false)
        if (type === selected) {
            return
        }
        setIsLoading(true)
        AttendanceService.updateAttendance(student, schedule, type).then(() => {
            setSelected(type)
        })
            .catch((e) => {
                console.log(e)
            }).finally(() => {
                setIsLoading(false)
            })
    }, [setSelected, student, schedule, selected])
    const handleInput = useCallback((e) => {
        const listOfLetters = {
            'g': 'attended',
            'п': 'attended',
            'y': 'absent',
            'н': 'absent',
            ',': 'sick',
            '<': 'sick',
            'б': 'sick',
            'h': 'order',
            'р': 'order',
        }
        if (e.target.value === '') {
            handleSelect('unknown')
        } else if (e.target.value[e.target.value.length - 1].toLowerCase() in listOfLetters) {

            handleSelect(listOfLetters[e.target.value[e.target.value.length - 1].toLowerCase()])
            e.target.blur()
        }

    }, [handleSelect])
    const handleInputClick = useCallback((e) => {
        if (isHintActive) {
            e.preventDefault()
            hideHint()
            e.target.blur()
        }
    }, [isHintActive, hideHint])


    useEffect(() => {
        function handleClickOutSide(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                hideHint()
            }
        }

        document.addEventListener('mousedown', handleClickOutSide)

        return () => {
            document.removeEventListener('mousedown', handleClickOutSide)
        }
    }, [ref, hideHint])
    return <div ref={ref} className={classes.select + (fixed ? ` ${classes.fixed}` : '')} {...props}>
        {isLoading && <div className={classes.loading_wrapper}>
            <Loading white={selected !== null && selected !== 'unknown'} size="small"></Loading>
        </div>}
        <InputBlock disabled={fixed || isLoading} style={{
            backgroundColor: (selected !== null && selected !== 'unknown') ? attendancesColor[selected] : undefined,
            color: (selected !== null && selected !== 'unknown') ? 'white' : undefined
        }} value={(selected !== null && selected !== 'unknown' && !isLoading) ? attendancesShortRu[selected] : ''} onBlur={hideHint} onChange={handleInput} onMouseDown={handleInputClick} onFocus={showHint} />

        <Hint position={hintPos} active={isHintActive}>
            <DelayRemove delay={200} visible={isHintActive}>
                <List>
                    {Object.keys(attendances).map((type) => {
                        if (type === 'unknown') {
                            return <Fragment key={type}></Fragment>
                        }
                        return <Variant key={type} onMouseDown={() => {
                            handleSelect(type)
                        }} type={type} />
                    })}
                    <Variant onMouseDown={() => {
                        handleSelect('unknown')
                    }} type={'unknown'} />

                </List>
            </DelayRemove>

        </Hint >


    </div>
}
export default SelectAttendance