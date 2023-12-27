import { forwardRef } from 'react'
import classes from './select-role.module.scss'
const SelectRole = (props, ref) => {
    return <select {...props} ref={ref} className={classes.select} >
        <option className={classes.option} disabled>Выберите Роль</option>
        <option className={classes.option} value="teacher">Преподаватель</option>
        <option className={classes.option} value="dean">Декан</option>
        <option className={classes.option} value="headman">Староста</option>
        <option className={classes.option} value="group">Аккаунт группы</option>
        <option className={classes.option} value="admin">Администратор</option>
    </select>
}
export default forwardRef(SelectRole) 