import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import Button from "../../ui/Button";
import InputText from "../../ui/Inputs/InputText/InputText";
import Wrapper from "../../ui/Wrapper";
import Validate from "../../utils/validate";
import ModalForm from "../ModalForm";

const FormEditFaculty = ({ onSuccess, facultyName, ...props }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: "all",
        defaultValues: {
            faculty: facultyName
        }
    });
    const { dirtyFields, errors, isDirty, isValid, touchedFields } = formState
    const { hideModal } = useModal()
    return <ModalForm onSubmit={handleSubmit((data) => {
        onSuccess({
            name: data.faculty
        })
    })}>
        <Wrapper direaction="col" align="center" justify="between" children_margin wrap={false} >
            <InputText size="medium"
                isDirty={dirtyFields["faculty"]} isValid={!errors["faculty"]} isTouched={touchedFields["faculty"]}
                placeholder="Название Факультета" type="text" {...register('faculty', { required: true, validate: (val) => new Validate(val).validFaculty() })} />
            <Wrapper justify="around" align="center" self_stretch >
                <Button size="medium" styleType="active" disabled={!isDirty || !isValid}>Изменить</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    hideModal()
                }} size="medium" >Отмена</Button>
            </Wrapper>
        </Wrapper>

    </ModalForm>
}
export default FormEditFaculty