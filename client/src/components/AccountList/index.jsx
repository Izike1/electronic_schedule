import { useCallback, useEffect, useRef, useState } from "react"
import Wrapper from "../../ui/Wrapper"
import { AccountService } from "../../api/AccountService"
import Loading from "../../ui/Loading"
import { requestRepeater } from "../../utils/requestRepeater"
import AccountItem from "./AccountItem"
import Modal from "../../ui/Modal"

const AccountList = ({ addAccount = () => { }, searchVal, ...props }) => {
    const getAccounts = useCallback(async (search, page) => {
        return await AccountService.searchAccounts(search, page, 10)
    }, [])
    const [isActiveModal, setIsActiveModal] = useState(false)
    const handleShowPassoword = useCallback((account) => {
        setFocusedAccount(account)
        setIsActiveModal(true)
    }, [])
    const [focusedAccount, setFocusedAccount] = useState(null)
    const footerElemRef = useRef(null)
    const observerRef = useRef(null)

    const [page, setPage] = useState(1);
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    useEffect(() => {
        let ignore = false
        setIsLoading(true)
        requestRepeater(async () => {
            return await getAccounts(searchVal, page)
        }, 4).then((res) => {
            if (!ignore) {
                if (!res?.data?.length) {
                    setIsEnd(true)
                } else {
                    setAccounts((prev) => [...prev, ...res.data])
                }

                setIsLoading(false)
            }
        }).catch((e) => {
            setIsLoading(false)
            setError(e)
        })
        return () => {
            ignore = true
        }
    }, [page, searchVal, getAccounts])
    useEffect(() => {
        setAccounts([]);
        setPage(1);
        setIsEnd(false)
    }, [searchVal]);
    useEffect(() => {
        if (isLoading || isEnd || error !== null) return
        observerRef.current = new IntersectionObserver((entries) => {
            const [entry] = entries
            if (entry.isIntersecting) {
                setPage((prev) => prev + 1)
            }
        }, {
            root: null,
            rootMargin: "40px",
            threshold: 1.0,
        })
        if (footerElemRef?.current) {
            observerRef.current.observe(footerElemRef.current)

        }
        return () => {

            observerRef.current.disconnect()

        }
    }, [isLoading, isEnd, error])
    return <Wrapper children_margin verticalMargin direaction="col">
        <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
            {focusedAccount && <Wrapper direaction="col" >
                <span>Логин: {focusedAccount.login}</span>
                <span>Пароль: {focusedAccount.password}</span>
            </Wrapper>
            }
        </Modal>
        {accounts && accounts.map((account) => {
            return <AccountItem handleShowPassowrd={handleShowPassoword} key={account.id} account={account}></AccountItem>
        })}
        {error && <Wrapper children_margin direaction="col" justify="center" align="center"><span>Ошибка: {error}</span><span>Попробуйте обновить страницу</span></Wrapper>}
        {isLoading && <Wrapper verticalMargin justify="center"> <Loading size="large" /></Wrapper>}
        <div ref={footerElemRef}></div>
    </Wrapper>
}
export default AccountList