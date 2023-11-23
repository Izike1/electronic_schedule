import { useState } from "react"
import { randomIntArray } from "../../devUtils/randomData"
import arrayToMatrix from "../../utils/arrayToMatrix"

// const Grid = (data) => {
//     return <ul>
//         {data.map((row) => {
//             return <li>
//                 <ul>
//                     {row.map((val) => {
//                         if (val !== null && val !== undefined) {
//                             return <li></li>
//                         }
//                         return <></>
//                     })}
//                 </ul>
//             </li>
//         })}
//     </ul>
// }

const CalendarInput = () => {
    const [value] = useState(new Date())
    for (let i = 0; i < 10; i++) {
        let data = randomIntArray(27, 31)
        console.log(data)

        console.log(arrayToMatrix(data, 7))
    }


    return <div>
        <span>{value.toLocaleDateString()}</span>
        Grid
    </div>
}
export default CalendarInput