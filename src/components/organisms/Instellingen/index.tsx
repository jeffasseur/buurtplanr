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
    username: string
    email: string
    adress: string
    postalcode: string
    housenummer: string
    password: string
    profilePicture: string
  }
  background: 'park' | 'street' | 'square'
}

const Instellingen = ({ profileInfo, background }: instellingenProps) => {
  const [backgroundState, setBackgroundState] = useState(background)
  const className = cx([styles.banner, styles[backgroundState]])

  const [formData, setFormData] = useState({
    username: profileInfo.username,
    email: profileInfo.email,
    adress: profileInfo.adress,
    postalcode: profileInfo.postalcode,
    housenummer: profileInfo.housenummer,
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
    updatedFormData.append('username', formData.username)
    updatedFormData.append('email', formData.email)
    updatedFormData.append('adress', formData.adress)
    updatedFormData.append('postalcode', formData.postalcode)
    updatedFormData.append('housenummer', formData.housenummer)
    updatedFormData.append('background', formData.background)

    const formDataObject = Object.fromEntries([...updatedFormData.entries()])
    /* TODO: remove console.log */
    console.log(formDataObject)

    /* TODO: add call to api to update user info */
  }

  return (
    <div className={styles.container}>
      <div className={className}>
        <Image src={profileInfo.profilePicture} alt={profileInfo.username} width={250} height={250} className={styles.profile} />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.content}>
          <div className={styles['button-container']}>
            <ChangePassword />
            <DeleteAccount />
            <Button as='button' size='small' append='save' onClick={onSubmit}>
              wijzigigen opslaan
            </Button>
          </div>
          <form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Gebruikersnaam</label>
              <Input
                type='text'
                placeholder={profileInfo.username}
                icon='user'
                onChange={(event) => {
                  updateFormData('username', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <Input
                type='text'
                placeholder={profileInfo.email}
                icon='mail'
                onChange={(event) => {
                  updateFormData('email', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Adress</label>
              <Input
                type='text'
                placeholder={profileInfo.adress}
                icon='location'
                onChange={(event) => {
                  updateFormData('adress', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Postcode</label>
              <Input
                type='text'
                placeholder={profileInfo.postalcode}
                icon='location'
                onChange={(event) => {
                  updateFormData('postalcode', event.target.value)
                }}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Huisnummer</label>
              <Input
                type='text'
                placeholder={profileInfo.housenummer}
                icon='location'
                onChange={(event) => {
                  updateFormData('housenummer', event.target.value)
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
