import { useCallback, useState } from 'react';
import classes from './verify.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import { useClassMap } from '../../../hooks/useClassMap';
import Loading from '../../../ui/Loading';
import { updateVerify } from '../../../api/Test/devVerify';
const VerifyBlock = ({ onChange = (e) => { console.log(e) }, verifiedBy = null, ...props }) => {
    const auth = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = useCallback(() => {
        setIsLoading(true)
        if (verifiedBy !== null) {
            updateVerify().then(() => {
                onChange({
                    type: 'unset'
                })
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })

        } else {
            updateVerify().then(() => {
                onChange({
                    type: 'set',
                    name: 'My Name'
                })
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })

        }

    }, [onChange, verifiedBy, setIsLoading])
    const classNames = useClassMap({
        [classes.verify_button]: true,
        [classes.fixed]: (auth.role === 'group' || auth.role === 'headman'),
        [classes.loading]: isLoading
    })

    return <div className={classes.wrap}>
        <button {...props} onClick={() => {
            if (!isLoading) {
                handleClick()
            }
        }} className={classNames()}>
            {isLoading ?
                <Loading size="small" />
                : verifiedBy !== null && verifiedBy}
        </button>
    </div>
}
export default VerifyBlock