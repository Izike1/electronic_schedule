import classes from './hint.module.scss'
const Hint = ({ active, position = 'bottom', children, ...props }) => {

    return <div className={`${classes.hint}${active ? ` ${classes.active}` : ''} ${classes[position]}`} {...props}>
        {children}
    </div>
}
export default Hint