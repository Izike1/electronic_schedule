import { useState } from "react"
import MainTable from "../components/MainTable"
import { randomArray, randomInt, randomListOfPersons } from "../devUtils/randomData"
import { useAuth } from "../hooks/useAuth"
import Button from "../ui/Button"
import Loading from "../ui/Loading"
import Modal from "../ui/Modal"
import Page from "../components/Page"


const MainPage = () => {
    const auth = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [modalActive, setModalActive] = useState(false)

    return <Page hasNav >
        <h1>Hello World</h1>
        <h2>{auth.role}</h2>
        <MainTable data={{
            day: Date.now(),
            timelines: [{
                time: '13:50',
                lessons: [
                    {
                        name: ['Название Предмета', 'Доп информация', 'Доп информация7'],
                        verifiedBy: 'Лапшин Н. А.'
                    },
                    {
                        name: ['Название Предмета', 'Доп информация', 'Доп информация5'],
                        verifiedBy: 'Лапшин Н. А.'
                    }
                ]
            },
            {
                time: '15:50',
                lessons: [
                    {
                        name: ['Название Предмета', 'Доп информация', 'Доп информация1'],
                        verifiedBy: null
                    }
                    , {
                        name: ['Название Предмета', 'Доп информация', 'Доп информация3'],
                        verifiedBy: null
                    }
                ]
            }],
            students: randomListOfPersons(20).map((p) => {
                return {
                    ...p,
                    states: randomArray(4, 4, () => randomInt(0, 4))
                }
            })
        }} />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Button onClick={() => {
                setIsLoading((prev) => !prev)
            }}>Toggle</Button>
            <Button isLoading={isLoading} styleType="active">Отмена</Button>
        </div>
        <Modal isActive={modalActive} setIsActive={setModalActive}>
            <div>123345345345345345</div>
        </Modal>
        <Button styleType="warning">Удалить</Button>
        <Button disabled>А всё</Button>
        <Button styleType="active" onClick={() => {
            setModalActive(true)
        }}>Show Modal</Button>
        <Button isLoading={isLoading} size="large" styleType="warning">Удалить</Button>
        <Loading size="medium" />
    </Page >

}
export default MainPage