import classes from './epmty-faculty.module.scss'
const EmptyFaculty = (props) => {
    return <div className={classes.card}>
        <button {...props} className={classes.btn}></button>
    </div>
}
export default EmptyFaculty