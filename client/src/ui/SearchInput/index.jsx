import classes from './search-input.module.scss'
const SearchInput = (props) => {
    return <div className={classes.wrapper}>
        <input placeholder='Поиск' {...props} className={classes.search} />
        <span className={"material-symbols-outlined " + classes.icon}>
            search
        </span>
    </div>

}
export default SearchInput