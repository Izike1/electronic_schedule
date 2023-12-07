import { forwardRef } from 'react'
import classes from './input-text.module.scss'
import { useClassMap } from '../../../hooks/useClassMap'
/**
 *  @param {{
 *      size: 'small'|'large'|'medium',
 *      isValid:boolean,
 *      isTouched:boolean,
 *      isDirty:boolean
 *  }} props 
 */
const InputText = ({ size = "small", isTouched, isValid, className = null, isDirty, type, ...props }, ref) => {
    const classNames = useClassMap({
        [classes.input]: true,
        [classes[size]]: true,
        [classes['invalid']]: !isValid && isTouched,
        [classes['valid']]: isValid && isDirty
    })
    return <input type={type} {...props} className={className ? `${classNames()} ${className}` : classNames()} ref={ref} />
}
export default forwardRef(InputText)