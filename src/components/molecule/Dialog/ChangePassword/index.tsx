import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { cx } from 'class-variance-authority'
import { useState } from 'react'

import Button from '@components/atoms/Button'
import Input from '@components/atoms/Input'

import styles from './styles.module.css'

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  })

  const updatePasswordData = (name: string, value: string) => {
    setPasswordData((prevPasswordData) => ({
      ...prevPasswordData,
      [name]: value
    }))
  }

  const onSubmitPassword = () => {
    const updatedPasswordData = new FormData()
    updatedPasswordData.append('oldPassword', passwordData.oldPassword)
    updatedPasswordData.append('newPassword', passwordData.newPassword)

    const passwordDataObject = Object.fromEntries([...updatedPasswordData.entries()])
    /* TODO: remove console.log */
    console.log(passwordDataObject)

    /* TODO: add call to api to update user info */
  }

  return (
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
            <form className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Oud wachtwoord</label>
                <Input
                  type='password'
                  icon='shield-security'
                  onChange={(event) => {
                    updatePasswordData('oldPassword', event.target.value)
                  }}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Nieuw wachtwoord</label>
                <Input
                  type='password'
                  icon='shield-security'
                  onChange={(event) => {
                    updatePasswordData('newPassword', event.target.value)
                  }}
                />
              </div>
            </form>
          </AlertDialog.Description>
          <div className={styles['button-wrapper']}>
            <AlertDialog.Cancel asChild>
              <Button size='small' theme='Cancel'>
                annuleren
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button size='small' append='shield-security' onClick={onSubmitPassword}>
                nieuw wachtwoord bewaren
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default ChangePassword
