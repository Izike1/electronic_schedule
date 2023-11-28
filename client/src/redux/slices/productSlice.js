import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const fetchProducts = createAsyncThunk('orders/fetchProducts', async () => {
    const { data } = await axios.get('product/getAll')
    console.log(data)
    return data;
});

export const fetchCreateProduct = createAsyncThunk('order/fetchCreateProduct', async (params) => {
    const { data } = await axios.post('product/create', params)
    return data;
})

export const fetchDeleteProduct = createAsyncThunk('order/fetchDeleteProduct', async (params) => {
    const { data } = await axios.delete(`product/delete?id=${params.id}`)
    return data;
})

const initialState = {
    data: null,
    products: {
        items: [],
        status: 'loading'
    },
    error: null,

}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.products.items = [];
            state.products.status = 'loading';
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.products.items = action.payload;
            state.products.status = 'loaded'
        },
        [fetchProducts.rejected]: (state) => {
            state.products.items = [];
            state.products.status = 'error';
        },
        [fetchCreateProduct.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchCreateProduct.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchCreateProduct.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        }
    },
})

export const productReducer = productSlice.reducer