import { useState } from "react"
import Button from "../../ui/Button"
import { AccountService } from "../../api/AccountService"
import { toast } from "react-toastify"
import Wrapper from "../../ui/Wrapper"
const AutocreateGroup = () => {
    const [isLoading, setIsLoading] = useState(false)
    return <Wrapper verticalMargin>
        <Button isLoading={isLoading} onClick={() => {
            if (!isLoading) {
                setIsLoading(true)
                AccountService.autocreateGroups().then(() => {
                    toast.success('Аккаунты автоматически созданы обновите страницу')
                }).catch((e) => {
                    console.log(e)
                }).finally(() => {
                    setIsLoading(false)
                })
            }
        }} size="large">Автоматическое создание аккаунтов для групп</Button>
    </Wrapper>
}
export default AutocreateGroup