import { Fragment } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { RoutesConfig } from '../../configs/Routes'
import { useAuth } from '../../hooks/useAuth'
const MainRouter = () => {
    const auth = useAuth()

    return <BrowserRouter>
        <Routes >
            {auth ?
                <Fragment>
                    {RoutesConfig.private[auth.role].pages.map((p) => {
                        return <Route key={p.path} path={p.path} element={p.component} />
                    })}

                    {<Route path="*" element={<Navigate to={RoutesConfig.private[auth.role].redirect} />} />}
                </Fragment>

                : <Fragment>
                    {RoutesConfig.public.pages.map((p) => {
                        return <Route key={p.path} path={p.path} element={p.component} />
                    })}
                    {<Route path="*" element={<Navigate to={RoutesConfig.public.redirect} />} />}
                </Fragment>}
        </Routes>
    </BrowserRouter>
}
export default MainRouter