import { Controller, useForm } from "react-hook-form"
import { useModal } from "../../hooks/useModal"
import Button from "../../ui/Button"
import InputPassword from "../../ui/Inputs/InputPassword"
import InputText from "../../ui/Inputs/InputText/InputText"
import Wrapper from "../../ui/Wrapper"
import Validate from "../../utils/validate"
import ModalForm from "../ModalForm"
import SelectRole from "../../ui/SelectRole"
import SelectFaculties from "../../components/SelectFaculties"

import SelectGroup from "../../components/SelectGroup"
import { useCallback, useState } from "react"
import { AccountService } from "../../api/AccountService"
import { toast } from "react-toastify"

const rolesHasName = new Set(['admin', 'headman', 'dean', 'teacher'])
const rolesHasGroup = new Set(['headman', 'group'])

const FormCreateAccount = () => {
    const { hideModal } = useModal()
    const { register, handleSubmit, formState, control, watch } = useForm({
        mode: "all",
        shouldUnregister: true
    });
    const roleField = watch('role')
    const facultyField = watch('faculty')
    const { isDirty, isValid, errors, touchedFields, dirtyFields } = formState
    const [isLoading, setIsLoading] = useState(false)
    const requestRegistration = useCallback((data) => {
        let { login, password, role, firstName, lastName, middleName, group: groupField } = data

        const groupId = groupField?.value
        if (!firstName) {
            firstName = login
            lastName = login
        }
        setIsLoading(true)

        AccountService.registration(login, password, role, { firstName, lastName, middleName, groupId }).then(() => {
            toast.success('Аккаунт создан')
        }).catch((e) => console.log(e)).finally(() => {
            setIsLoading(false)
        })
    }, [])
    return <ModalForm onSubmit={handleSubmit(requestRegistration)}>
        <Wrapper direaction="col" justify="between" children_margin>
            <InputText size="medium"
                isDirty={dirtyFields["login"]} isValid={!errors["login"]} isTouched={touchedFields["login"]}
                placeholder="Логин" type="text" {...register('login', { required: true, validate: (val) => new Validate(val).validLogin() })} />
            <InputPassword size="medium"
                isDirty={dirtyFields["password"]} isValid={!errors["password"]} isTouched={touchedFields["password"]}
                placeholder="Пароль"
                {...register('password', { required: true, validate: (val) => new Validate(val).validPassword() })} />
            <SelectRole {...register('role', { required: true })} />
            {rolesHasName.has(roleField) && <>
                <InputText isDirty={dirtyFields["lastName"]} isValid={!errors["lastName"]} isTouched={touchedFields["lastName"]}
                    placeholder="Введите фамилию" {...register('lastName', { required: true, validate: (val) => new Validate(val).validLastName })} />
                <InputText isDirty={dirtyFields["firstName"]} isValid={!errors["firstName"]} isTouched={touchedFields["firstName"]}
                    placeholder="Введите имя" {...register('firstName', { required: true, validate: (val) => new Validate(val).validName })} />
                <InputText
                    isDirty={dirtyFields["middleName"]} isValid={!errors["middleName"]} isTouched={touchedFields["middleName"]}
                    placeholder="Введите отчество" {...register('middleName', { required: false, validate: (val) => new Validate(val).validMiddleName })} />
            </>}
            {
                rolesHasGroup.has(roleField) && <>
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
                    <Controller
                        name="group"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister
                        render={({ field }) =>
                            <SelectGroup
                                field={field}
                                facultyId={facultyField?.value || null} />

                        }
                    />
                </>

            }
            <Wrapper justify="around">
                <Button size="medium" isLoading={isLoading} disabled={!isDirty || !isValid} onClick={(e) => {
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