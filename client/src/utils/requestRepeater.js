export const requestRepeater = async (fetchFoo, count) => {
    let error = null
    for (let i = 0; i < count; i++) {
        try {
            const data = await fetchFoo()
            return data
        } catch (e) {
            error = e
        }
    }
    throw error
}