import classes from './inputBlock.module.scss'
const InputBlock = ({ ...props }) => {

    return <input  {...props} className={classes.input} />
}
export default InputBlock