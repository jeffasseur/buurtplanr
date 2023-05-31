import Image from 'next/image'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const submitLogin = async (data) => {
  if (data.email !== '' && data.password !== '') {
    const dataString = JSON.stringify(data)
    await fetch('http://127.0.0.1:3002/burgers/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:3002/',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: dataString
    })
      .then(async (res) => await res.json())
      .then((data) => {
        console.log(data)
        if (data.status === 'success') {
          console.log('inlog succesvol')
          return data
        } else {
          console.log('inlog niet succesvol')
        }
      })
  } else {
    console.log('not everything is filled in')
  }
}

const Login = () => {
  const [FormData, setFormData] = useState({
    email: '',
    password: ''
  })
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
              <Icon name='profile-user' className={styles.icon} />
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
                  onClick={() => { void submitLogin(FormData) }}
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
