const createSyncProcess = () => {
    const processMap = new Map()
    const isInProcess = (val) => {
        return processMap.has(val)
    }
    const createProcess = (val) => {

        const process = {
            endProcess: function () {
            }
        }
        const p = new Promise((res, rej) => {
            process.endProcess = function () {
                processMap.delete(val)
                res()
            }
        })
        processMap.set(val, p)

        return process
    }
    const waitProcess = (val) => {

        if (!isInProcess(val)) {
            return Promise.resolve()
        }

        return processMap.get(val)
    }
    return {createProcess, waitProcess, isInProcess}
}
module.exports = {createSyncProcess}