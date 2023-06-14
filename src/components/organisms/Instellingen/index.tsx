import { cx } from 'class-variance-authority'
import Image from 'next/image'
import { useState } from 'react'

import Button from '@components/atoms/Button'
import Input from '@components/atoms/Input'
import ChangePassword from '@components/molecule/Dialog/ChangePassword'
import DeleteAccount from '@components/molecule/Dialog/DeleteAccount'
import TypeSelector from '@components/molecule/TypeSelector'

import styles from './styles.module.css'

interface instellingenProps {
  profileInfo: {
    _id: string
    firstname: string
    lastname: string
    email: string
    city: string
    street: string
    postalcode: string
    houseNumber: string
    password: string
    image: string
  }
  background: 'park' | 'street' | 'square'
}

const Instellingen = ({ profileInfo, background }: instellingenProps) => {
  const [backgroundState, setBackgroundState] = useState(background)
  const className = cx([styles.banner, styles[backgroundState]])

  const [formData, setFormData] = useState({
    firstname: profileInfo.firstname,
    lastname: profileInfo.lastname,
    email: profileInfo.email,
    city: profileInfo.city,
    street: profileInfo.street,
    postalcode: profileInfo.postalcode,
    houseNumber: profileInfo.houseNumber,
    password: profileInfo.password,
    image: profileInfo.image,
    background: backgroundState
  })

  const updateFormData = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleBackgroundChange = (background: 'park' | 'street' | 'square') => {
    setBackgroundState(background)
    updateFormData('background', background)
  }

  const onSubmit = () => {
    const updatedFormData = new FormData()
    updatedFormData.append('firstname', formData.firstname)
    updatedFormData.append('lastname', formData.lastname)
    updatedFormData.append('email', formData.email)
    updatedFormData.append('street', formData.street)
    updatedFormData.append('city', formData.city)
    updatedFormData.append('postalcode', formData.postalcode)
    updatedFormData.append('houseNumber', formData.houseNumber)
    updatedFormData.append('background', formData.background)

    // const formDataObject = Object.fromEntries([...updatedFormData.entries()])

    /* TODO: remove console.log */

    /* TODO: add call to api to update user info */
  }

  return (
    <div className={styles.container}>
      <div className={className}>
        <Image src={profileInfo.image} alt={profileInfo.firstname} width={250} height={250} className={styles.profile} />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.content}>
          <div className={styles['button-container']}>
            <ChangePassword />
            <DeleteAccount id={profileInfo._id} />
            <Button as='button' size='small' append='save' onClick={onSubmit}>
              wijzigigen opslaan
            </Button>
          </div>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor='firstname' className={styles.label}>Voornaam</label>
              <Input
                id='firstname'
                type='text'
                placeholder={profileInfo.firstname}
                icon='user'
                onChange={(event) => {
                  updateFormData('firstname', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='lastname' className={styles.label}>Achternaam</label>
              <Input
                id='lastname'
                type='text'
                placeholder={profileInfo.lastname}
                icon='user'
                onChange={(event) => {
                  updateFormData('lastname', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='email' className={styles.label}>Email</label>
              <Input
                id='email'
                type='text'
                placeholder={profileInfo.email}
                icon='sms'
                onChange={(event) => {
                  updateFormData('email', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='street' className={styles.label}>Straatnaam</label>
              <Input
                id='street'
                type='text'
                placeholder={profileInfo.street}
                icon='location'
                onChange={(event) => {
                  updateFormData('adress', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='houseNumber' className={styles.label}>Huisnummer</label>
              <Input
                id='houseNumber'
                type='text'
                placeholder={profileInfo.houseNumber}
                icon='location'
                onChange={(event) => {
                  updateFormData('houseNumber', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='city' className={styles.label}>Dorp, stad, gemeente</label>
              <Input
                id='city'
                type='text'
                placeholder={profileInfo.city}
                icon='location'
                onChange={(event) => {
                  updateFormData('city', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='postalcode' className={styles.label}>Postcode</label>
              <Input
                id='postalcode'
                type='text'
                placeholder={profileInfo.postalcode}
                icon='location'
                onChange={(event) => {
                  updateFormData('postalcode', event.target.value)
                }}
              />
            </div>
          </form>
          <span>Profiel achtergrond</span>
          <TypeSelector background={backgroundState} onChange={handleBackgroundChange} />
        </div>
      </div>
    </div>
  )
}

export default Instellingen
