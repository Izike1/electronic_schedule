import DelayRemove from '../DelayRemove'
import classes from './fixed-button.module.scss'
const FixedButton = ({ isActive = true, onClick, tooltip = "Привет, напиши что-нибудь в аттрибут tooltip", ...props }) => {
    return <DelayRemove visible={isActive} delay={200}>
        <div className={classes.fixed_wrapper + (isActive ? (' ' + classes.active) : '')}>
            <div className={classes.tooltip}>{tooltip}</div>
            <button onClick={onClick} className={classes.btn}>
                <span className={classes.stick}></span>
                <span className={classes.stick + ' ' + classes.stick_vertical}></span>
            </button>
        </div>
    </DelayRemove>

}
export default FixedButton