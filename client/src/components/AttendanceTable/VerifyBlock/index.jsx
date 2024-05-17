import { useCallback, useState } from 'react';
import classes from './verify.module.scss';
import { useClassMap } from '../../../hooks/useClassMap';
import Loading from '../../../ui/Loading';

import { useSelector } from 'react-redux';
import { AttendanceService } from '../../../api/AttendanceService';
const VerifyBlock = ({ schedule, onChange = (e) => { console.log(e) }, verifiedBy = null, ...props }) => {
    const auth = useSelector(({ authReducer }) => authReducer)
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = useCallback(() => {
        setIsLoading(true)
        if (verifiedBy !== null) {
            AttendanceService.unverifyByScheduleId(schedule).then(() => {
                onChange({
                    type: 'unset'
                })
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })

        } else {
            AttendanceService.verifyByScheduleId(schedule).then((res) => {
                onChange({
                    type: 'set',
                    userInfo: res.data.userInfo || null
                })
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            })

        }

    }, [verifiedBy, schedule, onChange])
    const classNames = useClassMap({
        [classes.verify_button]: true,
        [classes.fixed]: (auth.user.role === 'group' || auth.user.role === 'headman'),
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
                : verifiedBy !== null && `${verifiedBy.last_name} ${verifiedBy.first_name[0]}.${verifiedBy.middle_name ? ` ${verifiedBy.middle_name[0]}.` : ''} `}
        </button>
    </div>
}
export default VerifyBlock