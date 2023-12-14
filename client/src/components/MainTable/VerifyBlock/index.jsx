import { useCallback, useEffect, useState } from 'react';
import classes from './verify.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import { useClassMap } from '../../../hooks/useClassMap';
import Loading from '../../../ui/Loading';
const VerifyBlock = ({ onChange = (e) => { console.log(e) }, verifiedBy = null, ...props }) => {
    const auth = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = useCallback(() => {
        if (verifiedBy !== null) {
            onChange({
                type: 'unset'
            })
        } else {
            onChange({
                type: 'set',
                name: 'My Name'
            })
        }

    }, [onChange, verifiedBy])
    const classNames = useClassMap({
        [classes.verify_button]: true,
        [classes.fixed]: (auth.role === 'group' || auth.role === 'headman')
    })

    return <div className={classes.wrap}>
        <button {...props} onClick={handleClick} className={classNames()}>
            {isLoading ?
                <Loading size="small" />
                : verifiedBy !== null && verifiedBy}
        </button>
    </div>
}
export default VerifyBlock