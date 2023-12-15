import { useEffect, useRef, useState } from 'react'
import Wrapper from '../../ui/Wrapper'
import classes from './date-slider.module.scss'
import { dateToyyyyMMdd } from '../../utils/dateUtil'

const DateSlider = ({ defaultDate, onChange = (val) => { console.log(val) }, ...props }) => {
    const [value, setValue] = useState(defaultDate || Date.now())
    const isMountingRef = useRef(false);

    useEffect(() => {
        isMountingRef.current = true;
    }, []);
    useEffect(() => {
        if (!isMountingRef.current) {
            return onChange(value);
        } else {
            isMountingRef.current = false;
        }
    }, [value, onChange]);
    return <Wrapper verticalMargin classStr={classes.wrapper} justify='between'>
        <button onClick={() => {
            setValue((prev) => {
                let val = prev - 24 * 60 * 60 * 1000
                return val
            })
        }} className={classes.slide + ' material-symbols-outlined'}>
            chevron_left
        </button>
        <input className={classes.date_input} type='date' value={dateToyyyyMMdd(value)} onChange={(e) => {
            if (e.target.value !== '') {
                let val = new Date(e.target.value).getTime()
                setValue(val)
            }

        }} {...props} />
        <button onClick={() => {
            setValue((prev) => {
                let val = prev + 24 * 60 * 60 * 1000
                return val
            })
        }} className={classes.slide + ' material-symbols-outlined'}>
            chevron_right
        </button>
    </Wrapper>
}
export default DateSlider