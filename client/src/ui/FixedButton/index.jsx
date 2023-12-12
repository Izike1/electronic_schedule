import classes from './fixed-button.module.scss'
const FixedButton = ({ onClick, tooltip = "Привет, напиши что-нибудь в аттрибут tooltip", ...props }) => {
    return <div className={classes.fixed_wrapper}>
        <div className={classes.tooltip}>{tooltip}</div>
        <button onClick={onClick} className={classes.btn}>
            <span className={classes.stick}></span>
            <span className={classes.stick + ' ' + classes.stick_vertical}></span>
        </button>
    </div>

}
export default FixedButton