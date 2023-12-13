import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from 'src/axios/instance'

import { endpoint } from 'src/configs/endpoints/index'

export const manageBank = createAsyncThunk('manageBank', async (data, { getState, dispatch }) => {
  try {
    const response = await instance.post(endpoint.manageBank, data)
    dispatch(bankList(getState().bank.bank))

    return response.data
  } catch (error) {
    throw error
  }
})

export const bankList = createAsyncThunk('bankList', async data => {
  try {
    const response = await instance.get(endpoint.bankList, data)

    return response.data

    console.log('Bank List Data: ', response.data)
  } catch (error) {
    throw error
  }
})

export const deleteBank = createAsyncThunk('deleteBank', async (data, { getState, dispatch }) => {
  try {
    const response = await instance.delete(endpoint.deleteBank, { data })
    dispatch(bankList(getState().bank.bank))

    return response.data
  } catch (error) {
    throw error
  }
})

const bankListSlice = createSlice({
  name: 'bank',
  initialState: {
    bank: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(bankList.pending, state => {
        state.loading = true
      })
      .addCase(bankList.fulfilled, (state, action) => {
        state.loading = false
        state.bank = action.payload
      })
      .addCase(bankList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default bankListSlice.reducer
