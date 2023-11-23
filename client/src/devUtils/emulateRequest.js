const emulateRequest = (body, timeout = 1000, status = 200) => {
    switch (typeof body) {
        case 'string':
            break;
        case 'object':
            body = JSON.stringify(body)
            break;
        default:
            body = body.toString()
            break;
    }
    const answ = {
        status: status,
        text() {
            return new Promise((res) => {
                res(body)
            })
        },
        json() {
            return new Promise((res) => {
                res(JSON.parse(body))
            })
        }
    }
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (status < 400) {
                res(answ)
            } else {
                rej(answ)
            }
        }, timeout)
    })
}
export default emulateRequest