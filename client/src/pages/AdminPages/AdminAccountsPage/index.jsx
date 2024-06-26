import { useState } from "react"
import Page from "../../../components/Page"
import Container from "../../../ui/Container"
import Wrapper from "../../../ui/Wrapper"
import SearchInput from "../../../ui/SearchInput"

import AccountList from "../../../components/AccountList"
import { useScroll } from "../../../hooks/useScroll"
import FixedButton from "../../../ui/FixedButton"

import Modal from "../../../ui/Modal"
import FormCreateAccount from "../../../forms/FormCreateAccount"
import AutocreateGroup from "../../../components/AutocreateGroup"

const AdminAccountsPage = (props) => {
    const [searchVal, setSearchVal] = useState('')
    const currentPos = useScroll({
        300: 'hide_button'
    })
    const [isActiveCreateForm, setIsActiveCreateForm] = useState(false)
    return <Page hasNav>
        <AutocreateGroup />

        <FixedButton onClick={() => {
            setIsActiveCreateForm(true)
        }} isActive={currentPos !== 'hide_button'} tooltip="Здесь можно создать новые аккаунты" />
        <Modal isActive={isActiveCreateForm} setIsActive={setIsActiveCreateForm}>
            <FormCreateAccount />
        </Modal>
        <Container>
            <Wrapper verticalMargin direaction="col">
                <SearchInput onChange={(e) => {
                    setSearchVal(e.target.value)
                }} />
                <AccountList searchVal={searchVal} />
            </Wrapper>


        </Container>
        {/* <Wrapper fullPageOptions={{ hasNav: true }}></Wrapper> */}

    </Page >
}
export default AdminAccountsPage