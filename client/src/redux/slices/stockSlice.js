import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/axios'

export const fetchStock = createAsyncThunk('stocks/fetchStock', async () => {
    const { data } = await axios.get('stock/getAll')
    return data;
});

export const fetchAddStock = createAsyncThunk('stock/fetchAddStock', async (params) => {
    const { data } = await axios.post('stock/create', params)
    return data;
})

const initialState = {
    data: null,
    stocks: {
        items: [],
        status: 'loading'
    }

}

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchStock.pending]: (state) => {
            state.stocks.items = [];
            state.stocks.status = 'loading';
        },
        [fetchStock.fulfilled]: (state, action) => {
            state.stocks.items = action.payload;
            state.stocks.status = 'loaded'
        },
        [fetchStock.rejected]: (state) => {
            state.stocks.items = [];
            state.stocks.status = 'error';
        },
        [fetchAddStock.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAddStock.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAddStock.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        }
    },
})

export const stocksReduser = stocksSlice.reducer