import { useEffect } from "react"
import classes from './page.module.scss'
import { useClassMap } from "../../hooks/useClassMap"

const Page = ({ title = "Успеваемость AGPU", hasNav = false, ...props }) => {
    useEffect(() => {
        document.title = title
    }, [title])
    const classNames = useClassMap({
        [classes.page]: true,
        [classes.has_nav]: hasNav
    })
    return <div className={classNames()} {...props}>

    </div>
}
export default Page