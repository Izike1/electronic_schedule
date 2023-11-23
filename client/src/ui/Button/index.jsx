import { useEffect, useRef, useState } from 'react'
import Loading from '../Loading'
import classes from './button.module.scss'
const Button = ({ size = "small", isLoading = false, styleType = "common", children, style = {}, ...props }) => {
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
    return <button ref={ref} style={isLoading ? { ...sizes, ...style } : { ...style }} className={classes.btn + ' ' + classes[styleType] + (isLoading ? ` ${classes.loading}` : '')} {...props}>
        {isLoading ? <Loading white size={size} /> : children}
    </button>
}
export default Button