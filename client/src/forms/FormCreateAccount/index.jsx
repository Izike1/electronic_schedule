import { useForm } from "react-hook-form"
import { useModal } from "../../hooks/useModal"
import Button from "../../ui/Button"
import InputPassword from "../../ui/Inputs/InputPassword"
import InputText from "../../ui/Inputs/InputText/InputText"
import Wrapper from "../../ui/Wrapper"
import Validate from "../../utils/validate"
import ModalForm from "../ModalForm"
import SelectRole from "../../ui/SelectRole"

const FormCreateAccount = (props) => {
    const { hideModal } = useModal()
    const { register, handleSubmit, formState } = useForm({
        mode: "all"
    });
    const { isDirty, isValid, errors, touchedFields, dirtyFields } = formState
    return <ModalForm onSubmit={handleSubmit(async (data) => {
        console.log(data)

    })}>
        <Wrapper direaction="col" justify="between" children_margin>
            <InputText size="medium"
                isDirty={dirtyFields["login"]} isValid={!errors["login"]} isTouched={touchedFields["login"]}
                placeholder="Логин" type="text" {...register('login', { required: true, validate: (val) => new Validate(val).validLogin() })} />
            <InputPassword size="medium"
                isDirty={dirtyFields["password"]} isValid={!errors["password"]} isTouched={touchedFields["password"]}
                placeholder="Пароль"
                {...register('password', { required: true, validate: (val) => new Validate(val).validPassword() })} />
            <SelectRole />
            <Wrapper justify="around">
                <Button size="medium" disabled={!isDirty || !isValid} onClick={(e) => {
                }} styleType="active">Создать</Button>
                <Button size="medium" onClick={(e) => {
                    e.preventDefault()
                    hideModal()
                }} styleType="common">Отмена</Button>
            </Wrapper>
        </Wrapper>


    </ModalForm>
}
export default FormCreateAccount