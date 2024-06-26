import Wrapper from '../../ui/Wrapper'
import classes from './student-card.module.scss'
const StudentCard = ({ name, id, onRemove = () => { }, onEdit = () => { }, ...props }) => {
    return <div onClick={() => {
        onEdit()
    }} className={classes.card}>

        <h3 className={classes.name}>
            {name}
        </h3>
        <Wrapper classStr={classes.btn_wrap} justify='between'>
            <button onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onEdit()
            }} className={"material-symbols-outlined " + classes.edit}>edit</button>
            <button onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onRemove()
            }} className={"material-symbols-outlined " + classes.remove}>delete</button>
        </Wrapper>


    </div>
}
export default StudentCard