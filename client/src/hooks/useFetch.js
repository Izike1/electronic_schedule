import { useEffect, useState } from "react"

export const useFetch = (cb) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let ignore = false
        setIsLoading(true)
        cb().then((data) => {
            if (!ignore) {
                setIsLoading(false)
                setData(data)
            }

        }).catch((e) => {
            setIsLoading(false)
            setError(e)
        })

        return () => {
            ignore = true
        }
    }, [cb])
    return [data, isLoading, error, setData]

}