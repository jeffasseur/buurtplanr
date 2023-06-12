import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { cx } from 'class-variance-authority'
import Image from 'next/image'
import { useState } from 'react'

import Button from '@components/atoms/Button'
import Input from '@components/atoms/Input'
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

  const handleBackgroundChange = (background: 'park' | 'street' | 'square') => {
    setBackgroundState(background)
  }

  return (
    <div className={styles.container}>
      <div className={className}>
        <Image src={profileInfo.profilePicture} alt={profileInfo.username} width={250} height={250} className={styles.profile} />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.content}>
          <div className={styles['button-container']}>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <Button size='small' append='shield-security'>
                  wachtwoord wijzigen
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className={styles.DialogOverlay} />
                <AlertDialog.Content className={cx([styles.DialogContent, styles.passwordContent])}>
                  <AlertDialog.Title className={styles.DialogTitle}>Wachtwoord wijzigen</AlertDialog.Title>
                  <AlertDialog.Description className={styles.DialogPasswordDescription}>
                    <Input placeholder='Oud wachtwoord' type='password' />
                    <Input placeholder='Nieuw wachtwoord' type='password' />
                  </AlertDialog.Description>
                  <div className={styles['button-wrapper']}>
                    <AlertDialog.Cancel asChild>
                      <Button size='small' theme='Cancel'>
                        annuleren
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <Button size='small' append='shield-security'>
                        nieuw wachtwoord bewaren
                      </Button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <Button size='small' theme='Warning'>
                  account verwijderen
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className={styles.DialogOverlay} />
                <AlertDialog.Content className={styles.DialogContent}>
                  <AlertDialog.Title className={styles.DialogTitle}>Account verwijderen</AlertDialog.Title>
                  <AlertDialog.Description className={styles.DialogDescription}>
                    Deze actie kan niet ongedaan worden gemaakt. Weet je zeker dat je je account wilt verwijderen?
                  </AlertDialog.Description>
                  <div className={styles['button-wrapper']}>
                    <AlertDialog.Cancel asChild>
                      <Button size='small' theme='Cancel'>
                        annuleren
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <Button size='small' theme='Warning'>
                        account verwijderen
                      </Button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
            <Button size='small' append='save'>
              wijzigigen opslaan
            </Button>
          </div>
          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor='username' className={styles.label}>Gebruikersnaam</label>
              <Input type='text' placeholder={profileInfo.username} icon='user' />
            </div>
            <div className={styles.field}>
              <label htmlFor='email' className={styles.label}>Email</label>
              <Input type='text' placeholder={profileInfo.email} icon='mail' />
            </div>
            <div className={styles.field}>
              <label htmlFor='adress' className={styles.label}>Adress</label>
              <Input type='text' placeholder={profileInfo.adress} icon='location' />
            </div>
            <div className={styles.field}>
              <label htmlFor='postalcode' className={styles.label}>Postcode</label>
              <Input type='text' placeholder={profileInfo.postalcode} icon='location' />
            </div>
            <div className={styles.field}>
              <label htmlFor='housenummer' className={styles.label}>Huisnummer</label>
              <Input type='text' placeholder={profileInfo.housenummer} icon='location' />
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
