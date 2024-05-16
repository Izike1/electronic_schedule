import classes from './lesson-item.module.scss'
const LessonItem = ({ lesson, handleClick, ...props }) => {
    return <div onClick={() => handleClick(lesson)} className={classes.card}>
        <span>{lesson.name}</span>
    </div>
}
export default LessonItem