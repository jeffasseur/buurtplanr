'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'
import { burgerLogin, type AuthState, type Data } from '@/redux/features/auth-slice'
import { type AppDispatch } from '@/redux/store'

import styles from './styles.module.css'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const Login = () => {
  const [FormData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const dispatch = useDispatch<AppDispatch>()

  const submitLogin = async (formData) => {
    if (formData.email !== '' && formData.password !== '') {
      const dataString = JSON.stringify(formData)
      await fetch(`${baseURL}burgers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `${baseURL}`,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: dataString
      })
        .then(async (res) => await res.json())
        .then((data) => {
          if (data.status === 'success') {
            const tokenString: string = data.token
            const dataObject: Data = data.data
            const dispatchData: AuthState = {
              isAuth: true,
              data: dataObject,
              token: tokenString,
              isAdmin: false
            }
            dispatch(burgerLogin(dispatchData))
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.data))
            window.location.href = '/'
          } else if (data.status === 'error' || data.status !== 'success') {
            setError(data.message)
            return false
          } else {
            setError('Er is iets misgegaan')
            return false
          }
        })
        .catch((err) => {
          alert(err)
          return false
        })
    } else {
      setError('Vul alle velden in')
      return false
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imgCover}>
        <Title as='h1' size='h1' weight='bold' className={styles.welkomTitle}>Welkom</Title>
      </div>
      <div className={styles.loginWrapper}>
        <div className={styles.loginForm}>
          <Image src='/img/Logo.svg' alt='logo' width={300} height={76} />
          <fieldset className={styles.loginForm_fieldset}>
            <label>Email</label>
            <div className={styles.inputIcon}>
              <Input
                placeholder='Email'
                type='email'
                Size='medium'
                className={styles.input}
                required
                value={FormData.email}
                onChange={(e) => { setFormData({ ...FormData, email: e.target.value }) }}
                {...(error !== '' && { error: true })}
              />
              <Icon name='user' className={styles.icon} />
            </div>
          </fieldset>
          <fieldset className={styles.loginForm_fieldset}>
            <label>Wachtwoord</label>
            <div className={styles.inputIcon}>
              <Input
                type='password'
                placeholder='**********'
                Size='medium'
                className={styles.input}
                required
                value={FormData.password}
                onChange={(e) => { setFormData({ ...FormData, password: e.target.value }) }}
                {...(error !== '' && { error: true })}
              />
              <Icon name='shield-security' className={styles.icon} />
            </div>
          </fieldset>
          {
            error !== '' &&
            (
              <div className={styles.error}>
                <p>{error}</p>
              </div>
            )
          }
          <div>
            {
              ((FormData.email === '' && FormData.password === '') || (FormData.email === '' || FormData.password === '')) &&
              (
                <Button as='button' theme='Primary' disabled>
                  Aanmelden
                </Button>
              )
            }
            {
              FormData.email !== '' && FormData.password !== '' &&
              (
                <Button
                  as='button'
                  theme='Primary'
                  onClick={(e) => {
                    e.preventDefault()
                    void submitLogin(FormData)
                  }}
                >
                  Aanmelden
                </Button>
              )
            }
          </div>
          <div>
            <Link href='/register' className={styles.register}>Nog geen account? Registreer hier</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
