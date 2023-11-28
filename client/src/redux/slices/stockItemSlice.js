import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const fetchStockItem = createAsyncThunk('stockItem/fetchStockItem', async () => {
    const { data } = await axios.get('stockItem/getAll')
    return data;
});


const initialState = {
    data: null,
    stockItem: {
        items: [],
        status: 'loading'
    },
    error: null,
}

const stockItemSlice = createSlice({
    name: 'stockItem',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchStockItem.pending]: (state) => {
            state.stockItem.items = [];
            state.stockItem.status = 'loading';
        },
        [fetchStockItem.fulfilled]: (state, action) => {
            state.stockItem.items = action.payload;
            state.stockItem.status = 'loaded'
        },
        [fetchStockItem.rejected]: (state) => {
            state.stockItem.items = [];
            state.stockItem.status = 'error';
        }
    },
})

export const stockItemReduser = stockItemSlice.reducer