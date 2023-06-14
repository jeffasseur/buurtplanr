'use client'

import { useEffect, useState } from 'react'

import { useAppSelector } from '@/redux/store'

const ReduxCheck = () => {
  const [reduxCheck, setReduxCheck] = useState({
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
  })
  const reduxCheckSelector = useAppSelector(state => state.authReducer)

  useEffect(() => {
    setReduxCheck(reduxCheckSelector)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return reduxCheck
}

export default ReduxCheck
