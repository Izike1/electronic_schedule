import { Link } from 'react-router-dom'
import classes from './group-card.module.scss'
const GroupCard = ({ name, id, removeBtn = false, onRemove = () => { }, ...props }) => {
    return <div className={classes.card}>
        <Link className={classes.link} to={`/groups/${id}`}>
            <h3 className={classes.name}>
                {name}
            </h3>

            {removeBtn && <button onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onRemove()
            }} className={"material-symbols-outlined " + classes.remove}>delete</button>}
        </Link>
    </div>
}
export default GroupCard