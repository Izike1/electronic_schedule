import Wrapper from '../../ui/Wrapper'
import classes from './account-item.module.scss'
const AccountItem = ({ account, handleShowPassowrd, ...props }) => {
    return <div className={classes.card}>
        <span>{account.login}</span>
        <span>Роль: {account.role}</span>
        <Wrapper>{<button onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleShowPassowrd(account)
        }} className={"material-symbols-outlined " + classes.password}>visibility</button>}</Wrapper>
    </div>
}
export default AccountItem