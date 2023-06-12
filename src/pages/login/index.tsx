'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'
import { burgerLogin } from '@/redux/features/auth-slice'
import { type AppDispatch } from '@/redux/store'

import styles from './styles.module.css'

const baseURL: string = 'http://127.0.0.1:3002/'
// if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
//   baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
// }

const Login = () => {
  const [FormData, setFormData] = useState({
    email: '',
    password: ''
  })

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
            const dataObject: object = data.data
            const dispatchData = {
              isAuth: true,
              data: dataObject,
              token: tokenString,
              isAdmin: false
            }
            dispatch(burgerLogin(dispatchData))
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.data))
          } else {
            return { status: 'error', message: 'Er is iets misgegaan' }
          }
        })
        .then(() => {
          window.location.href = '/'
        })
        .catch((err) => {
          alert(err)
        })
    } else {
      return { status: 'error', message: 'Vul alle velden in' }
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.imgCover}>
        <Title as='h1' size='h1' weight='bold' className={styles.welkomTitle}>Welkom</Title>
      </div>
      <div className={styles.loginWrapper}>
        <div className={styles.loginForm}>
          <Image src='/img/logo.svg' alt='logo' width={300} height={76} />
          <fieldset className={styles.loginForm_fieldset}>
            <label>Email</label>
            <div className={styles.inputIcon}>
              <Input
                placeholder='Email'
                Size='medium'
                className={styles.input}
                required
                value={FormData.email}
                onChange={(e) => { setFormData({ ...FormData, email: e.target.value }) }}
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
              />
              <Icon name='shield-security' className={styles.icon} />
            </div>
          </fieldset>
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
        </div>
      </div>
    </div>
  )
}

export default Login
