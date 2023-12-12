import { useClassMap } from "../../hooks/useClassMap"
import classes from './wrapper.module.scss'
/**
 *  @param {{
 *      direaction: 'row'|'col',
 *      justify:'center'|'between'|'around'|'start'|'end',
 *      align:'stretch'|'center'|'start'|'end',
 *      wrap:boolean,
 *      verticalMargin:boolean,
 *      self_stretch:boolean
 *  }} props 
 */
const Wrapper = ({ direaction = 'row', justify = 'center', verticalMargin = false, align = 'stretch', self_stretch = false, wrap = true, classStr = '', ...props }) => {

    const getClassNames = useClassMap({
        [classes.wrapper]: true,
        [classes.column]: direaction === 'col',
        [classes[`justify_${justify}`]]: true,
        [classes[`align_${align}`]]: true,
        [classes.wrap]: wrap,
        [classes.vertical_margin]: verticalMargin,
        [classes.self_stretch]: self_stretch,
        [classStr]: true
    })
    return <div className={getClassNames()} {...props}>

    </div>
}
export default Wrapper