import { useEffect, useRef, useState } from "react"

export const useElementOnScreen = (options) => {
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const cb = (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
    }
    useEffect(() => {
        const observer = new IntersectionObserver(cb, options)
        if (containerRef?.current) {
            observer.observe(containerRef.current)
        }
        return () => {
            if (containerRef?.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(containerRef.current)
            }
        }
    }, [options])
    return [containerRef, isVisible]
}