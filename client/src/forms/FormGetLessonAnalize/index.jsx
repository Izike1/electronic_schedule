import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import Wrapper from "../../ui/Wrapper";
import ModalForm from "../ModalForm"
import Button from "../../ui/Button";
import { toast } from 'react-toastify'
import { AnalizeService } from "../../api/AnalizeService";
const FormGetLessonAnalize = ({ lesson }) => {
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
        AnalizeService.analizeByLesson(lesson.name, data.date_from, data.date_to).catch((e) => {
            toast.error(e?.message || 'Непредвиденная ошибка')
        })


        hideModal()
    })}>
        <Wrapper direaction="col" justify="between" align="center" children_margin wrap={false} >
            <p>Аналитика для дисциплины "{lesson.name}"</p>
            <label>
                <span>От: </span>
                <input
                    {...register('date_from', { required: true })}
                    type="date" defaultValue={new Date(2023, 7, 1).toISOString().slice(0, 10)} />
            </label>
            <label>
                <span>До: </span>
                <input
                    {...register('date_to', { required: true })}
                    type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
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
export default FormGetLessonAnalize