import { attendancesRu } from "../../../configs/Attendances"
import classes from './variant.module.scss'
const Variant = ({ type, ...props }) => {
    return <li {...props} className={classes[type] + ' ' + classes.variant} >{type === 'unknown' ? 'Не изучает' : attendancesRu[type][0].toUpperCase() + attendancesRu[type].slice(1)}</li>
}
export default Variant