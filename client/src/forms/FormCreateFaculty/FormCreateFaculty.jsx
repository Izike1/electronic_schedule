import { useForm } from "react-hook-form"
import Wrapper from "../../ui/Wrapper"
import classes from './form-create-faculty.module.scss'
import InputText from "../../ui/Inputs/InputText/InputText";
import Button from "../../ui/Button";
import Validate from "../../utils/validate";
import { useModal } from "../../hooks/useModal";
import { useCallback, useState } from "react";
import Loading from "../../ui/Loading";
import { FacultyService } from "../../api/FacultyService";
import { toast } from "react-toastify";
const FormCreateFaculty = ({ onSuccess, ...props }) => {
    const { register, handleSubmit, formState } = useForm({
        mode: "all"
    });
    const { dirtyFields, errors, isDirty, isValid, touchedFields } = formState
    const [isLoading, setIsLoading] = useState(false)
    const postFaclulty = useCallback(async (name) => {
        setIsLoading(true)
        const data = await FacultyService.createFaculty(name);

        toast.success('Факультет создан');

        return data.data


    }, [])
    const { hideModal } = useModal()
    return <form className={classes.form} onSubmit={handleSubmit((data) => {
        postFaclulty(data.faculty).then((f) => {
            onSuccess({
                id: f.id,
                name: f.name
            })
        }).catch((e) => {
            toast.error(e || 'Ошибка создания факультета')
        }).finally(() => {
            setIsLoading(false)
        })

    })}>
        <Wrapper direaction="col" align="center" justify="between" wrap={false} >
            {isLoading ?

                <Loading></Loading> :
                <>
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
                </>}

        </Wrapper>

    </form>
}
export default FormCreateFaculty