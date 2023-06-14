import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Data {
  _id: string
  name: string
  firstname: string
  lastname: string
  email: string
  password: string
  city: string
  postalcode: string
  street: string
  houseNumber: string
  image: string
  // background: 'park' | 'street' | 'square'
}

interface AuthState {
  isAuth: boolean
  data: Data
  token: string
  isAdmin: boolean
}

const initialState: AuthState = {
  isAuth: false,
  data: {
    _id: '',
    name: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    city: '',
    postalcode: '',
    street: '',
    houseNumber: '',
    image: ''
    // background: ''
  },
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
