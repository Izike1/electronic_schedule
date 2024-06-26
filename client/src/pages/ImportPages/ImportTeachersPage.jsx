import { useState } from "react"
import { useForm } from 'react-hook-form'
import Page from "../../components/Page"
import Container from "../../ui/Container"
import Wrapper from "../../ui/Wrapper"
import InputFile from "../../ui/Inputs/InputFile/InputFile"
import Button from '../../ui/Button'
import { ImportService } from "../../api/ImportService"
import { toast } from "react-toastify"
const ImportTeachersPage = (props) => {
    const [text, setText] = useState('Выберите файл')
    const { register, handleSubmit, formState } = useForm({
        mode: "all",
    })
    const [isLoading, setIsLoading] = useState(false)
    const { isDirty, isValid } = formState
    return <Page hasNav>
        <Container>
            <Wrapper fullPageOptions={{ hasNav: true }} justify="center" align="center" direaction="col">
                <form enctype="multipart/form-data" onSubmit={handleSubmit((data) => {
                    const { file } = data

                    if (file[0] && !isLoading) {
                        setIsLoading(true)
                        ImportService.importUsers(file[0], 'teachers').then(() => {
                            toast.success('Импортировано')
                        }).catch((e) => console.log(e)).finally(() => {
                            setIsLoading(false)
                        })
                    }


                })}>
                    <Wrapper children_margin align="center" direaction="col">
                        <InputFile text={text}{...register('file', {
                            required: true,
                            onChange: (e) => {
                                if (e?.target?.files?.length) {
                                    setText(e.target.files[0].name)
                                }

                            },
                        })} accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                        <Button isLoading={isLoading} styleType="active" size="medium" disabled={!isDirty || !isValid || isLoading}>Импортировать преподавателей</Button>
                    </Wrapper>

                </form>

            </Wrapper>
        </Container>

    </Page>
}
export default ImportTeachersPage