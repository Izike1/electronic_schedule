import { forwardRef } from 'react'
import classes from './input-file.module.scss'
import { useClassMap } from '../../../hooks/useClassMap'
/**
 *  @param {{
 *      size: 'small'|'large'|'medium',
 *      isValid:boolean,
 *      isTouched:boolean,
 *      isDirty:boolean
 *  }} props 
 */
const InputFile = ({ size = "small", text = "Выберите файл", styleType = "common", isTouched, isValid, className = null, isDirty, type, ...props }, ref) => {
    const classNames = useClassMap({
        [classes.label]: true,
        [classes[size]]: true,
        [classes['invalid']]: !isValid && isTouched,
        [classes['valid']]: isValid && isDirty,
        [classes[styleType]]: true,

    })
    return <label className={className ? `${classNames()} ${className}` : classNames()}>
        <span>{text}</span>
        <input type="file" {...props} className={classes.input} ref={ref} />
    </label>

}
export default forwardRef(InputFile)