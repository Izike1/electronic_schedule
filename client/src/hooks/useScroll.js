import { useEffect, useMemo, useState } from "react"

export const useScroll = (breakpoints) => {
    const [state, setState] = useState(0)
    const borders = useMemo(() => {
        const borders = [{ pos: 0, name: '__start' }]
        for (let key in breakpoints) {
            borders.push({
                pos: key,
                name: breakpoints[key]
            })
        }
        return borders
    }, [breakpoints])
    const currentBreakpoint = useMemo(() => borders[state].name, [borders, state])
    const prevPos = useMemo(() => state < 0 ? null
        : borders[state].pos, [state, borders])
    const nextPos = useMemo(() => state >= (borders.length - 1) ? null
        : borders[state + 1].pos, [state, borders])
    useEffect(() => {
        let ignore = false
        const handleScroll = () => {
            if (!ignore && nextPos !== null && window.scrollY > Number(nextPos)) {
                setState((prev) => prev + 1)
                ignore = true
            } else if (!ignore && prevPos !== null && window.scrollY < Number(prevPos)) {
                setState((prev) => prev - 1)
                ignore = true
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            ignore = true
            window.removeEventListener('scroll', handleScroll)
        }
    }, [nextPos, prevPos])
    return currentBreakpoint
} 