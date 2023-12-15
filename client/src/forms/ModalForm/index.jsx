import classes from './modal-form.module.scss'
const ModalForm = (props) => {
    return <form className={classes.form} {...props}></form>
}
export default ModalForm