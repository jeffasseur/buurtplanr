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

const Register = () => {
  const [error, setError] = useState('')
  const [FormData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    postalcode: '',
    city: '',
    street: '',
    houseNumber: '',
    image: ''
  })

  const submitRegister = async (formData) => {
    const dataString = JSON.stringify(formData)
    await fetch(`${baseURL}burgers/register`, {
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
          window.location.href = '/login'
        } else if (data.status === 'error' || data.status !== 'success') {
          setError(data.message)
          return false
        }
      })
      .catch((err) => {
        setError(err)
        return false
      })
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.imgCover}>
        <Title as='h1' size='h1' weight='bold' className={styles.welkomTitle}>Mechelen</Title>
      </div>
      <div className={styles.registerWrapper}>
        <form className={styles.registerForm}>
          <Image src='/img/logo.svg' alt='logo' width={300} height={76} />
          <div className={styles.nameWrapper}>
            <fieldset className={styles.registerForm_fieldset}>
              <label>Voornaam</label>
              <div className={styles.inputIcon}>
                <Input
                  placeholder='Voornaam'
                  {...(error !== '' && { error: true })}
                  Size='large'
                  className={styles.input}
                  required
                  value={FormData.firstname}
                  onChange={(e) => { setFormData({ ...FormData, firstname: e.target.value }) }}
                />
                <Icon name='user' className={styles.icon} />
              </div>
            </fieldset>
            <fieldset className={styles.registerForm_fieldset}>
              <label>Achternaam</label>
              <div className={styles.inputIcon}>
                <Input
                  placeholder='Achternaam'
                  {...(error !== '' && { error: true })}
                  Size='large'
                  className={styles.input}
                  required
                  value={FormData.lastname}
                  onChange={(e) => { setFormData({ ...FormData, lastname: e.target.value }) }}
                />
                <Icon name='user' className={styles.icon} />
              </div>
            </fieldset>
          </div>
          <fieldset className={styles.registerForm_fieldset}>
            <label>Email</label>
            <div className={styles.inputIcon}>
              <Input
                placeholder='Email'
                type='email'
                {...(error !== '' && { error: true })}
                Size='medium'
                className={styles.input}
                required
                value={FormData.email}
                onChange={(e) => { setFormData({ ...FormData, email: e.target.value }) }}
              />
              <Icon name='sms' className={styles.icon} />
            </div>
          </fieldset>
          <fieldset className={styles.registerForm_fieldset}>
            <label>Postcode</label>
            <div className={styles.inputIcon}>
              <Input
                placeholder='Postcode'
                {...(error !== '' && { error: true })}
                Size='medium'
                className={styles.input}
                required
                value={FormData.postalcode}
                onChange={(e) => { setFormData({ ...FormData, postalcode: e.target.value }) }}
              />
              <Icon name='location' className={styles.icon} />
            </div>
          </fieldset>
          <fieldset className={styles.registerForm_fieldset}>
            <label>Stad, dorp of gemeente</label>
            <div className={styles.inputIcon}>
              <Input
                placeholder='Stad, dorp of gemeente'
                {...(error !== '' && { error: true })}
                Size='medium'
                className={styles.input}
                required
                value={FormData.city}
                onChange={(e) => { setFormData({ ...FormData, city: e.target.value }) }}
              />
              <Icon name='location' className={styles.icon} />
            </div>
          </fieldset>
          <div className={styles.adressWrapper}>
            <fieldset className={styles.registerForm_fieldset}>
              <label>Straat</label>
              <div className={styles.inputIcon}>
                <Input
                  placeholder='Straat'
                  {...(error !== '' && { error: true })}
                  Size='medium'
                  className={styles.input}
                  required
                  value={FormData.street}
                  onChange={(e) => { setFormData({ ...FormData, street: e.target.value }) }}
                />
                <Icon name='location' className={styles.icon} />
              </div>
            </fieldset>
            <fieldset className={styles.registerForm_fieldset}>
              <label>Huisnummer</label>
              <div className={styles.inputIcon}>
                <Input
                  placeholder='Huisnummer'
                  {...(error !== '' && { error: true })}
                  Size='medium'
                  className={styles.input}
                  required
                  value={FormData.houseNumber}
                  onChange={(e) => { setFormData({ ...FormData, houseNumber: e.target.value }) }}
                />
                <Icon name='location' className={styles.icon} />
              </div>
            </fieldset>
          </div>
          <fieldset className={styles.registerForm_fieldset}>
            <label>Wachtwoord</label>
            <div className={styles.inputIcon}>
              <Input
                type='password'
                placeholder='**********'
                {...(error !== '' && { error: true })}
                Size='medium'
                className={styles.input}
                required
                value={FormData.password}
                onChange={(e) => { setFormData({ ...FormData, password: e.target.value }) }}
              />
              <Icon name='shield-security' className={styles.icon} />
            </div>
          </fieldset>
          <fieldset className={styles.registerForm_fieldset}>
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

export default Register
