import { useClassMap } from '../../hooks/useClassMap'
import classes from './loading.module.scss'
import { useMemo } from 'react'
const Loading = ({ white = false, size = 'large', ...props }) => {
    const classMap = useMemo(() => ({
        [classes.loading]: true,
        [classes[size]]: true,
        [classes.common]: white,
    }), [size, white])
    const getClasses = useClassMap(classMap)
    return <div {...props} className={getClasses()}>
        <div className={classes.border1}></div>
        <div className={classes.border2}></div>
        <div className={classes.border3}></div>
    </div>
}
export default Loading