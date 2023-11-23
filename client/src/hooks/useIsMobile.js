import { createContext, useContext } from "react"


const IsMobileContext = createContext(null)
export const useIsMobile = () => {
    return useContext(IsMobileContext)
}


export default IsMobileContext