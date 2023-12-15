import emulateRequest from "../../devUtils/emulateRequest"

export const updateVerify = async (userId) => {
    await emulateRequest('', 1000, 204)
    return {
        type: userId === null ? 'unset' : 'set',
        name: userId === null ? null : 'My name'
    }
}