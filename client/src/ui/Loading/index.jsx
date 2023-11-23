import classes from './loading.module.scss'
const Loading = ({ white = false, size = 'large', ...props }) => {
    return <div {...props} className={classes.loading + ' ' + classes[size] + (white ? ` ${classes.common}` : +'')}>
        <div className={classes.border1}></div>
        <div className={classes.border2}></div>
        <div className={classes.border3}></div>
    </div>
}
export default Loading