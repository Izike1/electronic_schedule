const arrayToMatrix = (arr, row = null, col = null) => {
    if (row === null) {
        if (col === null) {
            row = Math.ceil(Math.sqrt(arr.length))
            col = Math.ceil(arr.length / row)
        } else {
            row = Math.ceil(arr.length / col)
        }
    } else {
        if (col === null) {
            col = Math.ceil(arr.length / row)
        }
    }
    const res = []
    for (let i = 0; i < col; i++) {
        res.push([])
        for (let j = 0; j < row; j++) {

            res[i].push(arr[j + i * row])

        }
    }
    return res
}
export default arrayToMatrix