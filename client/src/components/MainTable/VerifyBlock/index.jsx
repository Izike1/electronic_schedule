import { useEffect } from 'react';
import classes from './verify.module.scss';
const VerifyBlock = ({ onChange = (e) => { console.log(e) }, isLoading = false, verifiedBy = null, currentUser = { role: 2, userFullName: 'Кто-то ЛОЛ' }, ...props }) => {
    const handleClick = useEffect(() => {

    }, [onChange, verifiedBy])
    return <div className={classes.wrap}>
        <button {...props} onClick={handleClick} className={classes.verify_button + ((verifiedBy !== null || currentUser.role !== 2) ? ` ${classes.fixed}` : '')}>
            {verifiedBy !== null && verifiedBy}
        </button>
    </div>
}
export default VerifyBlock