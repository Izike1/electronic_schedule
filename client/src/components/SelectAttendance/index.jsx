import { Fragment, useCallback, useState, useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import attendances, { attendancesShortRu, attendancesColor } from '../../configs/Attendances'
import DelayRemove from '../../ui/DelayRemove'
import Hint from '../../ui/Hint'
import InputBlock from '../../ui/InputBlock'
import List from '../../ui/List'
import classes from './select.module.scss'
import Variant from './Variant'

const SelectAttendance = ({ onChange, fixed = false, hintPos = 'bottom', value = null, ...props }) => {
    const [isHintActive, setHintActive] = useState(false)
    const ref = useRef(null)
    const [selected, setSelected] = useState(value)
    const isMobile = useIsMobile()


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

    const handleChange = useCallback((type) => {
        if (onChange) {
            onChange(type)
        }
    }, [onChange])
    const handleSelect = useCallback((type) => {
        setSelected(type)
        setHintActive(false)
        handleChange(type)
    }, [setSelected, handleChange])
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
            handleChange('unknown')
            setSelected(null)
        } else if (e.target.value[e.target.value.length - 1].toLowerCase() in listOfLetters) {

            handleSelect(listOfLetters[e.target.value[e.target.value.length - 1].toLowerCase()])
            e.target.blur()
        }

    }, [handleSelect, setSelected, handleChange])
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

        <InputBlock disabled={fixed} style={{
            backgroundColor: (selected !== null && selected !== 'unknown') ? attendancesColor[selected] : undefined,
            color: (selected !== null && selected !== 'unknown') ? 'white' : undefined
        }} value={selected !== null ? attendancesShortRu[selected] : ''} onBlur={hideHint} onChange={handleInput} onMouseDown={handleInputClick} onFocus={showHint} />

        <Hint position={hintPos} active={isHintActive}>
            <DelayRemove delay={200} visible={isHintActive}>
                <List>
                    {Object.keys(attendances).map((type) => {
                        if (type === 'unknown') {
                            return <Fragment key={type}></Fragment>
                        }
                        return <Variant key={type} onClick={() => {
                            handleSelect(type)
                        }} type={type} />
                    })}
                    <Variant onClick={() => {
                        handleSelect('unknown')
                    }} type={'unknown'} />

                </List>
            </DelayRemove>

        </Hint >


    </div>
}
export default SelectAttendance