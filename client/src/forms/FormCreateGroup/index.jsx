import { useForm } from "react-hook-form";
import { useModal } from "../../hooks/useModal";
import Wrapper from "../../ui/Wrapper";
import InputText from "../../ui/Inputs/InputText/InputText";
import Button from "../../ui/Button";
import Validate from "../../utils/validate";
import ModalForm from "../ModalForm";
import { useCallback, useState } from "react";
import { GroupService } from "../../api/GroupService";
import { toast } from "react-toastify";
import Loading from "../../ui/Loading";
const FormCreateGroup = ({ onSuccess, facultyId, onError, ...props }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: "all"
    });
    const { dirtyFields, errors, isDirty, isValid, touchedFields } = formState

    const [isLoading, setIsLoading] = useState(false)
    const postGroup = useCallback(async (name) => {
        setIsLoading(true)
        const data = await GroupService.createGroup(facultyId, name);

        toast.success('Группа создана');

        return data.data


    }, [facultyId])

    const { hideModal } = useModal()
    return <ModalForm onSubmit={handleSubmit((data) => {
        postGroup(data.group).then((g) => {
            onSuccess({
                id: g.id,
                name: g.name,
                facultyId
            })
        }).catch((e) => {
            toast.error(e || 'Ошибка создания группы')
        }).finally(() => {
            setIsLoading(false)
        })

    })}>
        {isLoading ? <Loading></Loading> : <Wrapper children_margin direaction="col" align="center" justify="between" wrap={false} >
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
        </Wrapper>}


    </ModalForm>
}
export default FormCreateGroup