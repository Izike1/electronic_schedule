import emulateRequest from "../../devUtils/emulateRequest"
import { randomArray, randomInt, randomListOfPersons } from "../../devUtils/randomData"

export const devFetchTable = async () => {
    const response = await emulateRequest({
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
    }, 1000, 200)
    return await response.json()
}