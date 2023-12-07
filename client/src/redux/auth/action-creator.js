import axios from "axios";

import { API_URL } from "../../api/api";


import AuthService from "../../service/AuthService";
import { authSlice } from ".";


export const AuthActionCreators = {
    login: (login, password) => async (dispatch) => {
        try {

            const response = await AuthService.login(login, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(authSlice.actions.setIsLoading(false))
            dispatch(authSlice.actions.setUser(response.data.user))
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

            const response = await axios.get(API_URL + '/refresh', { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken)
            dispatch(authSlice.actions.setUser(response.data.user))
            dispatch(authSlice.actions.setIsAuth(true))
        } catch (err) {
            if (err) {
                return dispatch(authSlice.actions.setError([err.message]))
            }
            return dispatch(authSlice.actions.setError(['Непредвиденная ошибка']))
        }

    }
}