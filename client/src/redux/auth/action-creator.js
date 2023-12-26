import axios from "axios";

import { API_URL } from "../../api/api";


import { AuthService } from "../../api/AuthService";
import { authSlice } from "./authSlice";


export const AuthActionCreators = {
    login: (login, password) => async (dispatch) => {
        try {
            const response = await AuthService.login(login, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(authSlice.actions.setIsLoading(false))
            dispatch(authSlice.actions.setUser(response.data.auth))
            dispatch(authSlice.actions.setIsAuth(true))
        } catch (err) {
            if (err) {
                return dispatch(authSlice.actions.setError([err]))
            }
            return dispatch(authSlice.actions.setError(['Непредвиденная ошибка']))
        }

    },
    logout: () => async (dispatch) => {
        try {
            dispatch(authSlice.actions.setIsLoading(true))
            await AuthService.logout()
            localStorage.removeItem('token')
            dispatch(authSlice.actions.setUser({}))
            dispatch(authSlice.actions.setIsAuth(false))

        } catch (err) {

            if (err) {
                return dispatch(authSlice.actions.setError([err]))
            }
            return dispatch(authSlice.actions.setError(['Непредвиденная ошибка']))
        }
    },
    checkAuth: () => async (dispatch) => {
        dispatch(authSlice.actions.setIsLoading(true))
        try {

            const response = await axios.get(API_URL + '/auth/refresh', { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            dispatch(authSlice.actions.setUser(response.data.auth))
            dispatch(authSlice.actions.setIsAuth(true))
        } catch (err) {
            if (err) {
                return dispatch(authSlice.actions.setError([err.message]))
            }
            return dispatch(authSlice.actions.setError(['Непредвиденная ошибка']))
        }

    }
}