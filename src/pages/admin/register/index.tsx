import Image from 'next/image'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

let baseURL: string = '/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const AdminRegister = () => {
  const submitRegister = async (data) => {
    if (data.email !== '' && data.password !== '') {
      const dataString = JSON.stringify(data)
      await fetch(`${baseURL}gemeentes/register`, {
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
            window.location.href = '/admin/login'
          } else {
            setError(data.message)
            return false
          }
        })
    } else {
      setError('Email en wachtwoord zijn verplicht')
      return false
    }
  }

  const [error, setError] = useState('')
  const [FormData, setFormData] = useState({
    name: '',
    postalcode: '',
    city: '',
    passcode: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })
  return (
    <div className={styles.loginContainer}>
      <div className={styles.imgCover}>
        <Title as='h1' size='h1' weight='bold' className={styles.welkomTitle}>
          Welkom
        </Title>
      </div>
      <div className={styles.loginWrapper}>
        <form className={styles.loginForm}>
          <Image src='/img/logo.svg' alt='logo' width={300} height={76} />
          <fieldset className={styles.loginForm_fieldset}>
            <label>Voor- en achternaam</label>
            <div className={styles.inputIcon}>
              <Input
                placeholder='Voor- en achternaam'
                Size='medium'
                className={styles.input}
                required
                value={FormData.name}
                onChange={(e) => { setFormData({ ...FormData, name: e.target.value }) }}
                {...(error !== '' && { error: true })}
              />
              <Icon name='user' className={styles.icon} />
            </div>
          </fieldset>
          <fieldset className={styles.loginForm_fieldset}>
            <label>Postcode</label>
            <div className={styles.inputIcon}>
              <Input
                placeholder='Postalcode'
                Size='medium'
                className={styles.input}
                required
                value={FormData.postalcode}
                onChange={(e) => { setFormData({ ...FormData, postalcode: e.target.value }) }}
                {...(error !== '' && { error: true })}
              />
              <Icon name='location' className={styles.icon} />
            </div>
          </fieldset>
          <fieldset className={styles.loginForm_fieldset}>
            <label>Gemeente, Stad of Dorpsnaam</label>
            <div className={styles.inputIcon}>
              <Input
                placeholder='Gemeente, Stad of Dorpsnaam'
                Size='medium'
                className={styles.input}
                required
                value={FormData.city}
                onChange={(e) => { setFormData({ ...FormData, city: e.target.value }) }}
                {...(error !== '' && { error: true })}
              />
              <Icon name='location' className={styles.icon} />
            </div>
          </fieldset>
          <fieldset className={styles.loginForm_fieldset}>
            <label>Code</label>
            <div className={styles.inputIcon}>
              <Input
                placeholder='Code...'
                Size='medium'
                className={styles.input}
                required
                value={FormData.passcode}
                onChange={(e) => { setFormData({ ...FormData, passcode: e.target.value }) }}
                {...(error !== '' && { error: true })}
              />
              <Icon name='shield-security' className={styles.icon} />
            </div>
          </fieldset>
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
              <Icon name='sms' className={styles.icon} />
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
          <fieldset className={styles.loginForm_fieldset}>
            <label>Bevestig wachtwoord</label>
            <div className={styles.inputIcon}>
              <Input
                type='password'
                placeholder='**********'
                Size='medium'
                className={styles.input}
                required
                value={FormData.passwordConfirm}
                onChange={(e) => { setFormData({ ...FormData, passwordConfirm: e.target.value }) }}
                {...(error !== '' && { error: true })}
              />
              <Icon name='shield-security' className={styles.icon} />
            </div>
          </fieldset>
          {
            error !== '' && (
              <div className={styles.errorWrapper}>
                <p className={styles.error}>{error}</p>
              </div>
            )
          }
          <div>
            <Button
              as='button'
              theme='Primary'
              onClick={(e) => {
                e.preventDefault()
                void submitRegister(FormData)
              }}
            >
              Registreer
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister
