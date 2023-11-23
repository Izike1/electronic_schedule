import classes from './list.module.scss'
const List = (props) => {
    return <ul className={classes.list} {...props}></ul>
}
export default List