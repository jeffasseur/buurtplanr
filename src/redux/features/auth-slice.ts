import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuth: boolean
  data: object
  token: string
  isAdmin: boolean
}

const initialState: AuthState = {
  isAuth: false,
  data: {},
  token: '',
  isAdmin: false
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    burgerLogin: (state, action: PayloadAction<AuthState>) => ({
      ...state,
      isAuth: true,
      data: action.payload.data,
      token: action.payload.token,
      isAdmin: false
    }),
    gemeenteLogin: (state, action: PayloadAction<AuthState>) => ({
      ...state,
      isAuth: true,
      data: action.payload.data,
      token: action.payload.token,
      isAdmin: true
    })
  }
})

export const { logOut, burgerLogin, gemeenteLogin } = auth.actions
export default auth.reducer
