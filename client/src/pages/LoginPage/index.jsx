import { useState } from "react"
import classes from './login-page.module.scss'
import Button from "../../ui/Button"
import Validate from "../../utils/validate"
import { useForm } from 'react-hook-form'
import InputText from "../../ui/Inputs/InputText/InputText"
import Page from "../../components/Page"
import InputPassword from "../../ui/Inputs/InputPassword"
import Wrapper from "../../ui/Wrapper"
import { useDispatch } from "react-redux"
import { AuthActionCreators } from "../../redux/auth/action-creator"

const LoginPage = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState } = useForm({
        mode: "all"
    });
    const { isDirty, isValid, errors, touchedFields, dirtyFields } = formState
    return <Page title="Вход">
        <div className={classes.wrap}>
            <form className={classes.form} onSubmit={handleSubmit(async (data) => {
                setIsLoading(true)
                await dispatch(AuthActionCreators.login(data.login, data.password))
                setIsLoading(false)

            })}>
                <Wrapper direaction="col" justify="between">
                    <InputText size="medium"
                        isDirty={dirtyFields["login"]} isValid={!errors["login"]} isTouched={touchedFields["login"]}
                        placeholder="Логин" type="text" {...register('login', { required: true, validate: (val) => new Validate(val).validLogin() })} />
                    <InputPassword size="medium"
                        isDirty={dirtyFields["password"]} isValid={!errors["password"]} isTouched={touchedFields["password"]}
                        placeholder="Пароль"
                        {...register('password', { required: true, validate: (val) => new Validate(val).validPassword() })} />
                    <Button isLoading={isLoading} onClick={(e) => {
                        if (isLoading) {
                            e.preventDefault()
                        }
                    }} size="medium" styleType="active" disabled={!isDirty || !isValid}>Вход</Button>
                </Wrapper>

            </form>
        </div>

    </Page>
}
export default LoginPage
