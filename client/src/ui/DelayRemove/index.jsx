import { useEffect, useState } from "react"

const DelayRemove = ({ visible = true, delay = 200, children }) => {
    const [active, setActive] = useState(visible)
    useEffect(() => {
        let timer = null
        if (visible !== active) {
            if (!visible) {
                timer = setTimeout(() => {
                    setActive(false)
                }, delay)
            } else {
                if (timer !== null) {
                    clearTimeout(timer)
                    timer = null
                }
                setActive(true)
            }
        } else {
            if (timer !== null) {
                clearTimeout(timer)
                timer = null
            }
        }
        return () => {
            if (timer !== null) {
                clearTimeout(timer)
                timer = null
            }
        }
    }, [visible, setActive, active, delay])
    return <>
        {
            active &&
            children
        }
    </>
}
export default DelayRemove