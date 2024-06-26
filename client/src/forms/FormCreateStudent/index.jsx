import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import Wrapper from "../../ui/Wrapper";
import InputText from "../../ui/Inputs/InputText/InputText";
import Button from "../../ui/Button";
import Validate from "../../utils/validate";
import ModalForm from "../ModalForm";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../ui/Loading";
import { UserService } from "../../api/UserService";
const FormCreateStudent = ({ onSuccess, groupId, onError, ...props }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: "all"
    });
    const { dirtyFields, errors, isDirty, isValid, touchedFields } = formState

    const [isLoading, setIsLoading] = useState(false)
    const postStudent = useCallback(async (firstName, lastName, middleName = null) => {
        setIsLoading(true)
        const data = await UserService.addStudentToGroup(groupId, firstName, lastName, middleName);

        toast.success('Студент добавлен');
        const newStudent = {
            id: data.data.id,
            last_name: lastName,
            first_name: firstName,
            middle_name: middleName
        }
        return newStudent


    }, [groupId])

    const { hideModal } = useModal()
    return <ModalForm onSubmit={handleSubmit((data) => {
        const { firstName, lastName, middleName } = data
        postStudent(firstName, lastName, middleName).then((s) => {
            const { first_name, last_name, middle_name, id } = s
            onSuccess({
                id,
                User_info: {
                    first_name, last_name, middle_name
                }

            })
        }).catch((e) => {
            toast.error(e || 'Ошибка добавления студента')
        }).finally(() => {
            setIsLoading(false)
        })

    })}>
        {isLoading ? <Loading></Loading> : <Wrapper children_margin direaction="col" align="center" justify="between" wrap={false} >
            <InputText isDirty={dirtyFields["lastName"]} isValid={!errors["lastName"]} isTouched={touchedFields["lastName"]}
                placeholder="Введите фамилию" {...register('lastName', { required: true, validate: (val) => new Validate(val).validLastName })} />
            <InputText isDirty={dirtyFields["firstName"]} isValid={!errors["firstName"]} isTouched={touchedFields["firstName"]}
                placeholder="Введите имя" {...register('firstName', { required: true, validate: (val) => new Validate(val).validName })} />
            <InputText
                isDirty={dirtyFields["middleName"]} isValid={!errors["middleName"]} isTouched={touchedFields["middleName"]}
                placeholder="Введите отчество" {...register('middleName', { required: false, validate: (val) => new Validate(val).validMiddleName })} />
            <Wrapper justify="around" align="center" self_stretch >
                <Button size="medium" styleType="active" disabled={!isDirty || !isValid}>Создать</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    hideModal()
                }} size="medium" >Отмена</Button>
            </Wrapper>
        </Wrapper>}


    </ModalForm>
}
export default FormCreateStudent