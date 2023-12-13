import classes from './faculty-card.module.scss'
import { Link } from 'react-router-dom'
const FacultyCard = ({ faculty, ...props }) => {
    return <div className={classes.card}>
        <Link className={classes.link} to={`${faculty.id}`}><h2>{faculty.name}</h2></Link>
    </div>
}
export default FacultyCard