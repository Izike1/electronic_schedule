
import { configureStore } from '@reduxjs/toolkit'

import { rootReducers } from "./reducers.js"


export const setupStore = () => configureStore({
    reducer: rootReducers,
    devTools: true
})
export const store = setupStore()

export default store;