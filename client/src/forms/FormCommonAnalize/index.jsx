import { Controller, useForm } from "react-hook-form";
import Wrapper from "../../ui/Wrapper";
import Button from "../../ui/Button";
import SelectFaculties from "../../components/SelectFaculties";
import SelectGroup from "../../components/SelectGroup";
import classes from './form-common-analize.module.scss'
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AnalizeService } from "../../api/AnalizeService";
const buttonTextByType = {
    'faculty': 'Аналитика по факультету',
    'group': 'Аналитика по группе',
    'student': 'Аналитика по студенту'
}
const FormCommonAnalize = () => {
    const { register, handleSubmit, formState, control, watch } = useForm({
        mode: "all",
        shouldUnregister: true
    });

    const [isLoading, setIsLoading] = useState(false)
    const groupField = watch('group')
    const facultyField = watch('faculty')
    const { isDirty, isValid, errors, touchedFields, dirtyFields } = formState

    const analizeType = useMemo(() => {
        if (!facultyField?.value) {
            return null
        }
        if (!groupField?.value) {
            return 'faculty'
        }
        return 'group'
    }, [facultyField, groupField])
    const downloadAnalize = useCallback(async (data) => {
        let date_from = new Date(data.date_from).setHours(0)
        let date_to = new Date(data.date_to).setHours(0)
        if (date_from > date_to) {
            return toast.error('"От" должно быть меньше чем "До"')
        }
        if (analizeType === 'faculty') {
            try {
                setIsLoading(true)
                await AnalizeService.analizeByFaculty(data.faculty.value, data.date_from, data.date_to, data.faculty.label)

            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
            return
        }
        if (analizeType === 'group') {
            try {
                setIsLoading(true)
                await AnalizeService.analizeByGroup(data.group.value, data.date_from, data.date_to, data.group.label)

            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }

            return
        }
    }, [analizeType])
    return <form className={classes.form} onSubmit={handleSubmit(downloadAnalize)}>
        <Wrapper direaction="col" justify="between" children_margin>
            <label className={classes.label_date}>
                <span>От: </span>
                <input
                    className={classes.date}
                    {...register('date_from', { required: true })}
                    type="date" defaultValue={new Date(2023, 7, 1).toISOString().slice(0, 10)} />
            </label>
            <label className={classes.label_date}>
                <span>До: </span>
                <input
                    className={classes.date}
                    {...register('date_to', { required: true })}
                    type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
            </label>
            <Controller
                name="faculty"
                control={control}
                rules={{ required: true }}
                shouldUnregister
                render={({ field }) =>
                    <SelectFaculties
                        field={field} />

                }
            />
            {
                facultyField?.value &&
                < Controller
                    name="group"
                    control={control}
                    rules={{ required: false }}
                    shouldUnregister
                    render={({ field }) =>
                        <SelectGroup
                            isClearable
                            field={field}
                            facultyId={facultyField?.value || null} />

                    }
                />
            }

            <Button isLoading={isLoading} styleType="common" size="medium" disabled={!isDirty || !isValid}>{analizeType ? buttonTextByType[analizeType] : 'Скачать'}</Button>
        </Wrapper>
    </form>
}
export default FormCommonAnalize