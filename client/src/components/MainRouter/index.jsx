import { Fragment } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { RoutesConfig } from '../../configs/Routes'

import NavBar from '../NavBar'
import { NavigationRoutesConfig } from '../../configs/NavigationRoutes'
import { useSelector } from 'react-redux'
const MainRouter = () => {
    const auth = useSelector(({ authReducer }) => authReducer)
    return <>
        {auth.isAuth && <NavBar links={NavigationRoutesConfig[auth.user.role].pathes} />}
        <Routes >
            {auth.isAuth ?
                <Fragment>


                    {RoutesConfig.private[auth.user.role].pages.map((p) => {
                        return <Route key={p.path} path={p.path} element={p.component} />
                    })}

                    {<Route path="*" element={<Navigate to={RoutesConfig.private[auth.user.role].redirect} />} />}
                </Fragment>

                : <Fragment>
                    {RoutesConfig.public.pages.map((p) => {
                        return <Route key={p.path} path={p.path} element={p.component} />
                    })}
                    {<Route path="*" element={<Navigate to={RoutesConfig.public.redirect} />} />}
                </Fragment>}
        </Routes>
    </>
}
export default MainRouter