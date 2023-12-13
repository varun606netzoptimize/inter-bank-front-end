// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import bank from 'src/store/apps/bank'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    bank
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const useAppDispatch = useDispatch
export const useAppSelector = useSelector
