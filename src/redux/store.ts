import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useSelector } from 'react-redux'

import authReducer from '@/redux/features/auth-slice'

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state))
  } catch (e) {
    return undefined
  }
}

const loadFromLocalStorage = () => {
  try {
    const state = localStorage.getItem('state')
    if (state === null) return undefined
    return JSON.parse(state)
  } catch (e) {
    return undefined
  }
}

// const rootReducer = combineReducers({
//   reducer: authReducer
// })

const persistedStore = loadFromLocalStorage()

export const store = configureStore({
  reducer: { authReducer },
  preloadedState: persistedStore
})

store.subscribe(() => { saveToLocalStorage(store.getState()) })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
