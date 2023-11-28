import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
import { stocksReduser } from "./slices/stockSlice";
import { providerReducer } from "./slices/providerSlice";
import { categoriesReducer } from "./slices/categoriesSlice";
import { stockItemReduser } from "./slices/stockItemSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        stock: stocksReduser,
        provider: providerReducer,
        categories: categoriesReducer,
        stockItem: stockItemReduser
    }
})

export default store;