import { NavLink } from 'react-router-dom'
import classes from './nav-bar.module.scss'
import { useState } from 'react'
const NavBar = ({ links, ...props }) => {
    const [isActive, setIsActive] = useState(false)
    return <nav className={classes.nav} {...props}>
        <div className={classes.container}>
            <button onClick={() => {
                setIsActive((p) => !p)
            }} className={classes.burger + (isActive ? ` ${classes.active}` : '')}>
                <span className={classes.stick + ' ' + classes.stick1}></span>
                <span className={classes.stick + ' ' + classes.stick2}></span>
                <span className={classes.stick + ' ' + classes.stick3}></span>
            </button>
            <ul className={classes.link_wrapper + (isActive ? ` ${classes.active}` : '')}>
                {links.map((l) => {
                    return <li key={l.link} className={classes.item}>
                        <NavLink onClick={() => {
                            setIsActive(false)
                        }} to={l.link} className={({ isActive }) => {
                            if (isActive) {
                                return classes.link_active
                            }
                        }}>
                            <span>{l.name}</span>
                        </NavLink>
                    </li>
                })}
            </ul>
            <button className={classes.logout}><span className="material-symbols-outlined">
                logout
            </span></button>
        </div>

    </nav>
}
export default NavBar