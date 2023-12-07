import { useEffect, useRef, useState, useMemo } from 'react'
import Loading from '../Loading'
import classes from './button.module.scss'
import { useClassMap } from '../../hooks/useClassMap'
/**
 *  @param {{
 *      size: 'small'|'large'|'medium',
 *      isLoading:boolean,
 *      disabled:boolean,
 *      styleType:'common'|'active'|'warning'
 *  }} props 
 */

const Button = ({ size = "small", isLoading = false, disabled = false, styleType = "common", children, style = {}, ...props }) => {
    const ref = useRef(null)
    const [sizes, setSizes] = useState(null)
    useEffect(() => {
        if (ref.current) {
            let elementHeight = ref.current.offsetHeight;
            let elementWidth = ref.current.offsetWidth;
            setSizes({
                width: elementWidth,
                height: elementHeight
            })
        }
    }, [ref])
    const classMap = useMemo(() => ({
        [classes.btn]: true,
        [classes.loading]: isLoading,
        [classes[size]]: true,
        [classes[styleType]]: true,
        [classes.disabled]: disabled,
    }), [size, styleType, isLoading, disabled])
    const getClasses = useClassMap(classMap)
    return <button ref={ref} style={isLoading ? { ...sizes, ...style } : { ...style }} className={getClasses()} {...props}>
        {isLoading ? <Loading white size={size === 'large' ? 'medium' : 'small'} /> : children}
    </button>
}
export default Button