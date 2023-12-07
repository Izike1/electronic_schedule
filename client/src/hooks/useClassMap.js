import { useCallback } from "react"

export const useClassMap = (map) => {

    return useCallback(() => {
        const res = []
        for (let className in map) {
            if (map[className]) {
                res.push(className)
            }
        }
        return res.join(' ')
    }, [map])
}
