import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import Button from "../../ui/Button";
import InputText from "../../ui/Inputs/InputText/InputText";
import Wrapper from "../../ui/Wrapper";
import Validate from "../../utils/validate";
import ModalForm from "../ModalForm";
import { useState } from "react";
import { UserService } from "../../api/UserService";

const FormEditStudent = ({ studentId, onSuccess, lastName, firstName, middleName = '', ...props }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: "all",
        defaultValues: {
            lastName, firstName, middleName
        }
    });
    const { dirtyFields, errors, isDirty, isValid, touchedFields } = formState
    const { hideModal } = useModal()
    const [isChanging, setIsChanging] = useState(false)
    return <ModalForm onSubmit={handleSubmit((data) => {
        setIsChanging(true)
        const { lastName, firstName, middleName } = data
        UserService.changeStudent(studentId, firstName, lastName, middleName || '').then(() => {
            onSuccess({
                lastName, firstName, middleName, id: studentId
            })
            setIsChanging(false)
            hideModal()
        }).catch((e) => {
            console.log(e)
            setIsChanging(false)
        })

    })}>
        <Wrapper direaction="col" align="center" justify="between" children_margin wrap={false} >
            <InputText isDirty={dirtyFields["lastName"]} isValid={!errors["lastName"]} isTouched={touchedFields["lastName"]}
                placeholder="Введите фамилию" {...register('lastName', { required: true, validate: (val) => new Validate(val).validLastName })} />
            <InputText isDirty={dirtyFields["firstName"]} isValid={!errors["firstName"]} isTouched={touchedFields["firstName"]}
                placeholder="Введите имя" {...register('firstName', { required: true, validate: (val) => new Validate(val).validName })} />
            <InputText
                isDirty={dirtyFields["middleName"]} isValid={!errors["middleName"]} isTouched={touchedFields["middleName"]}
                placeholder="Введите отчество" {...register('middleName', { required: false, validate: (val) => new Validate(val).validMiddleName })} />
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
export default FormEditStudent