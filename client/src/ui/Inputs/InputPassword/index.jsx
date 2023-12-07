import { forwardRef, useState } from 'react'
import InputText from '../InputText/InputText'
import classes from './input-password.module.scss'
/**
 *  @param {{
 *      size: 'small'|'large'|'medium',
 *      isValid:boolean,
 *      isTouched:boolean,
 *      isDirty:boolean
 *  }} props 
 */
const InputPassword = ({ size = 'small', ...props }, ref) => {
    const [isShow, setIsShow] = useState(false)
    return <div className={classes.wrap}>

        <InputText type={isShow ? 'text' : 'password'} className={classes[size]}  {...props} ref={ref} />
        <button type='button' onClick={() => {
            setIsShow((p) => !p)
        }} className={classes.hint_btn}>{isShow ? '\uD83D\uDC41\ufe0f' : '\uD83D\uDD12'}</button>
        {/* { dd12} */}

    </div>
}
export default forwardRef(InputPassword)