import { useMemo } from "react"
import { useClassMap } from "../../hooks/useClassMap"
import classes from './wrapper.module.scss'
/**
 *  @param {{
 *      direaction: 'row'|'col',
 *      justify:'center'|'between'|'around'|'start'|'end',
 *      align:'stretch'|'center'|'start'|'end',
 *      nowrap:boolean
 *  }} props 
 */
const Wrapper = ({ direaction = 'row', justify = 'center', align = 'stretch', nowrap = false, ...props }) => {
    const classMap = useMemo(() => {
        return {
            [classes.wrapper]: true,
            [classes.column]: direaction === 'col',
            [classes[`justify_${justify}`]]: true,
            [classes[`align_${align}`]]: true,
            [classes.nowrap]: nowrap
        }
    }, [direaction, justify, align, nowrap])

    const getClassNames = useClassMap(classMap)
    return <div className={getClassNames()} {...props}>

    </div>
}
export default Wrapper