import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import Button from "../../ui/Button";
import InputText from "../../ui/Inputs/InputText/InputText";
import Wrapper from "../../ui/Wrapper";
import Validate from "../../utils/validate";
import ModalForm from "../ModalForm";
import { useState } from "react";
import { FacultyService } from "../../api/FacultyService";

const FormEditFaculty = ({ onSuccess, facultyName, facultyId, ...props }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: "all",
        defaultValues: {
            faculty: facultyName
        }
    });
    const { dirtyFields, errors, isDirty, isValid, touchedFields } = formState
    const { hideModal } = useModal()
    const [isChanging, setIsChanging] = useState(false)
    return <ModalForm onSubmit={handleSubmit((data) => {

        setIsChanging(true)
        FacultyService.renameFaculty(facultyId, data.faculty).then(() => {
            onSuccess({
                name: data.faculty
            })
            setIsChanging(false)
            hideModal()
        }).catch((e) => {
            console.log(e)
            setIsChanging(false)
        })

    })}>
        <Wrapper direaction="col" align="center" justify="between" children_margin wrap={false} >
            <InputText size="medium"
                isDirty={dirtyFields["faculty"]} isValid={!errors["faculty"]} isTouched={touchedFields["faculty"]}
                placeholder="Название Факультета" type="text" {...register('faculty', { required: true, validate: (val) => new Validate(val).validFaculty() })} />
            <Wrapper justify="around" align="center" self_stretch >
                <Button isLoading={isChanging} size="medium" styleType="active" disabled={!isDirty || !isValid}>Изменить</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    hideModal()
                }} size="medium" >Отмена</Button>
            </Wrapper>
        </Wrapper>

    </ModalForm>
}
export default FormEditFaculty