import { useState } from "react"
import MainTable from "../components/MainTable"
import { randomArray, randomInt, randomListOfPersons } from "../devUtils/randomData"
import { useAuth } from "../hooks/useAuth"
import Button from "../ui/Button"
import Loading from "../ui/Loading"

const MainPage = () => {
    const auth = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    return <div>
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


        <Loading size="medium" />

    </div>
}
export default MainPage