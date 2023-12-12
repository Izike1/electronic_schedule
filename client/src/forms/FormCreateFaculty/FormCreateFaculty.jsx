import { useForm } from "react-hook-form"
import Wrapper from "../../ui/Wrapper"
import classes from './form-create-faculty.module.scss'
import InputText from "../../ui/Inputs/InputText/InputText";
import Button from "../../ui/Button";
import Validate from "../../utils/validate";
import { useModal } from "../../hooks/useModal";
const FormCreateFaculty = ({ onSuccess, ...props }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: "all"
    });
    const { dirtyFields, errors, isDirty, isValid, touchedFields } = formState
    const { hideModal } = useModal()
    return <form className={classes.form} onSubmit={handleSubmit((data) => {
        onSuccess({
            id: Math.random(),
            name: data.faculty
        })
    })}>
        <Wrapper direaction="col" align="center" justify="between" wrap={false} >
            <InputText size="medium"
                isDirty={dirtyFields["faculty"]} isValid={!errors["faculty"]} isTouched={touchedFields["faculty"]}
                placeholder="Название Факультета" type="text" {...register('faculty', { required: true, validate: (val) => new Validate(val).validFaculty() })} />
            <Wrapper justify="around" align="center" self_stretch >
                <Button size="medium" styleType="active" disabled={!isDirty || !isValid}>Создать</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    hideModal()
                }} size="medium" >Отмена</Button>
            </Wrapper>
        </Wrapper>

    </form>
}
export default FormCreateFaculty