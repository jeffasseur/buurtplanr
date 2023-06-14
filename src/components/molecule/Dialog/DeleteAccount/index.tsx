import * as AlertDialog from '@radix-ui/react-alert-dialog'

import Button from '@components/atoms/Button'

import styles from './styles.module.css'

const DeleteAccount = () => {
  return (
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
  )
}

export default DeleteAccount
