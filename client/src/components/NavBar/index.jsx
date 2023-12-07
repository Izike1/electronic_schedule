import { Link } from 'react-router-dom'
import classes from './nav-bar.module.scss'
const NavBar = ({ links, ...props }) => {
    console.log(links)
    return <nav className={classes.nav}>
        <div className={classes.container}>
            <ul className={classes.link_wrapper}>
                {links.map((l) => {
                    return <li key={l.link} className={classes.item}>
                        <Link to={l.link}>
                            <span>{l.name}</span>
                        </Link>
                    </li>
                })}
            </ul>
            <button className={classes.logout}>{'\ud83d\udeaa'}</button>
        </div>

    </nav>
}
export default NavBar