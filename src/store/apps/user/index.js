// ** Library Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from 'src/axios/instance'

// ** Utils imports
import { endpoint } from 'src/configs/endpoints/index'
export const userList = createAsyncThunk('userList', async () => {
  try {
    const response = await instance.get(endpoint.userList)
    return response.data
  } catch (error) {
    throw error
  }
})

export const manageUser = createAsyncThunk('manageUser', async (data, { getState, dispatch }) => {
  try {
    const response = await instance.post(endpoint.manageUser, data)
    dispatch(userList(getState().user.users))
    return response.data
  } catch (error) {
    throw error
  }
})

export const deleteUser = createAsyncThunk('deleteUser', async (data, { getState, dispatch }) => {
  try {
    const response = await instance.delete(endpoint.deleteUser, { data })
    dispatch(userList(getState().user.users))
    return response.data
  } catch (error) {
    throw error
  }
})

const userListSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userList.pending, state => {
        state.loading = true
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(userList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default userListSlice.reducer
