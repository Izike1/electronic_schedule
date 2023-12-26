import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import Wrapper from "../../ui/Wrapper";
import ModalForm from "../ModalForm"
import Button from "../../ui/Button";
import { toast } from 'react-toastify'
const FormGetFacultyAnalize = (props) => {
    const { register, handleSubmit, formState } = useForm({
        mode: "all",
    });
    const { isDirty, isValid } = formState
    const { hideModal } = useModal()
    return <ModalForm onSubmit={handleSubmit((data) => {
        let date_from = new Date(data.date_from).setHours(0)
        let date_to = new Date(data.date_to).setHours(0)
        if (date_from > date_to) {
            return toast.error('"От" должно быть меньше чем "До"')
        }

    })}>
        <Wrapper direaction="col" justify="between" align="center" children_margin wrap={false} >
            <label>
                <span>От: </span>
                <input
                    {...register('date_from', { required: true })}
                    type="date" />
            </label>
            <label>
                <span>До: </span>
                <input
                    {...register('date_to', { required: true })}
                    type="date" />
            </label>

            <Wrapper justify="around" align="center" self_stretch >
                <Button size="medium" styleType="active" disabled={!isDirty || !isValid}>Получить</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    hideModal()
                }} size="medium" >Отмена</Button>
            </Wrapper>
        </Wrapper>

    </ModalForm>
}
export default FormGetFacultyAnalize