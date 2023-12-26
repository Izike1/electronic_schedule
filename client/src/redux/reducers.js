import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
export const rootReducers = combineReducers({
    authReducer: authSlice
})