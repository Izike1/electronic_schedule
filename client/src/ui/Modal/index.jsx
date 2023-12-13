import classes from './modal.module.scss'
import DelayRemove from '../DelayRemove'
import { useEffect, useRef } from 'react'
import { ModalContext } from '../../hooks/useModal'
const Modal = ({ isActive, setIsActive, isCloseble = true, children, ...props }) => {
    const ref = useRef(null)
    useEffect(() => {
        function handleClickOutSide(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsActive(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutSide)

        return () => {
            document.removeEventListener('mousedown', handleClickOutSide)
        }
    }, [ref, setIsActive])
    return <ModalContext.Provider value={{
        hideModal: () => setIsActive(false)
    }}>
        <DelayRemove visible={isActive} delay={100}>

            <div className={classes.wrap + `${isActive ? ` ${classes.active}` : ''}`}>

                <div ref={ref} {...props} className={classes.content}>
                    {isCloseble && <div className={classes.close_wrapper}>
                        <button className={classes.close} onClick={() => { setIsActive(false) }}>
                            <span className={classes.stick}></span>
                            <span className={classes.stick}></span>
                        </button>
                    </div>}

                    {children}
                </div>
            </div>
        </DelayRemove>

    </ModalContext.Provider>
}
export default Modal