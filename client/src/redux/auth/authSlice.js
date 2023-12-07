import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isAuth: false,
    error: [],
    isLoading: false,
    user: {},
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
            state.isLoading = false
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
            state.isLoading = false
            state.isAuth = false
        }
    }
})
export default authSlice.reducer