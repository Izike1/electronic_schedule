import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import Wrapper from "../../ui/Wrapper";
import InputText from "../../ui/Inputs/InputText/InputText";
import Button from "../../ui/Button";
import Validate from "../../utils/validate";
import ModalForm from "../ModalForm";
const FormCreateGroup = ({ onSuccess, facultyId, onError, ...props }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: "all"
    });
    const { dirtyFields, errors, isDirty, isValid, touchedFields } = formState
    const { hideModal } = useModal()
    return <ModalForm onSubmit={handleSubmit((data) => {
        onSuccess({
            id: Math.random(),
            name: data.group,
            facultyId
        })
    })}>
        <Wrapper children_margin direaction="col" align="center" justify="between" wrap={false} >
            <h3 style={{ marginTop: 0 }}>Название группы должно быть как на сайте <a href="https://www.it-institut.ru/SearchString/Index/118">it-institut.ru</a></h3>
            <InputText size="medium"
                isDirty={dirtyFields["group"]} isValid={!errors["group"]} isTouched={touchedFields["group"]}
                placeholder="Название Группы" type="text" {...register('group', { required: true, validate: (val) => new Validate(val).validGroup() })} />
            <Wrapper justify="around" align="center" self_stretch >
                <Button size="medium" styleType="active" disabled={!isDirty || !isValid}>Создать</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    hideModal()
                }} size="medium" >Отмена</Button>
            </Wrapper>
        </Wrapper>

    </ModalForm>
}
export default FormCreateGroup