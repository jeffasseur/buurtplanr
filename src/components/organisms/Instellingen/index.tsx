import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { cx } from 'class-variance-authority'
import Image from 'next/image'
import { useState } from 'react'

import Button from '@components/atoms/Button'
import Input from '@components/molecule/Input'
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
  const [changePassword, setChangePassword] = useState(false)

  const setChangePasswordState = () => {
    setChangePassword(!changePassword)
  }

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
            {!changePassword && (
              <Button size='small' append='shield-security' onClick={setChangePasswordState}>
                wachtwoord wijzigen
              </Button>
            )}
            {changePassword && (
              <Button size='small' append='shield-security' onClick={setChangePasswordState}>
                nieuw wachtwoord bewaren
              </Button>
            )}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button size='small' theme='Warning'>
                  account verwijderen
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className={styles.DialogOverlay} />
                <Dialog.Content className={styles.DialogContent}>
                  <Dialog.Title className={styles.DialogTitle}>Account verwijderen</Dialog.Title>
                  <Dialog.Description className={styles.DialogDescription}>
                    Deze actie kan niet ongedaan worden gemaakt. Weet je zeker dat je je account wilt verwijderen?
                  </Dialog.Description>
                  <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                    <Dialog.Close asChild>
                      <Button size='small' theme='Warning'>
                        account verwijderen
                      </Button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Close asChild>
                    <button className='IconButton' aria-label='Close'>
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <Button size='small' append='save'>
              wijzigigen opslaan
            </Button>
          </div>
          <Input label='Username' text={profileInfo.username} icon='user' />
          <Input label='Email' text={profileInfo.email} icon='mail' />
          <Input label='Adress' text={profileInfo.adress} icon='location' />
          <Input label='Postalcode' text={profileInfo.postalcode} icon='location' />
          <Input label='Housenummer' text={profileInfo.housenummer} icon='location' />
          <span>Profiel achtergrond</span>
          <TypeSelector background={backgroundState} onChange={handleBackgroundChange} />
          {changePassword && (
            <>
              <Input label='Oud wachtwoord' type='password' icon='shield-security' />
              <Input label='Nieuw wachtwoord' type='password' icon='shield-security' />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Instellingen
