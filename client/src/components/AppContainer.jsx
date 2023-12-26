
import MainRouter from "./MainRouter"

import IsMobileContext from "../hooks/useIsMobile"
import IconLoader from "./IconLoader"
import { ToastContainer } from "react-toastify"
import { useMemo } from "react"
import getIsMobile from "../utils/getIsMobile"

const AppContainer = (props) => {
    const isMobile = useMemo(getIsMobile, [getIsMobile])
    return <>
        <IconLoader>
            <IsMobileContext.Provider value={isMobile}>

                <MainRouter />


            </IsMobileContext.Provider>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </IconLoader>

    </>
}
export default AppContainer