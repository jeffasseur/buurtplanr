import Link from 'next/link'

import Button from '@/components/atoms/Button'

import Icon from '../../atoms/Icon'

import styles from './styles.module.css'

const isAdmin = true
const loggedIn = true

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles['logo-container']}>
        <Link href='/'>
          <Icon name='logo' className={styles.logo} />
        </Link>
      </div>
      <div className={styles.menu}>
        <Link href='/'>
          <Icon name='home' />
        </Link>
        {
          isAdmin && loggedIn &&
          (
            <Button as='link' href='/admin' append='security-user' size='small'>
              Admin
            </Button>
          )
        }
        {
          !loggedIn &&
          (
            <div className={styles.accountBtns}>
              <Button as='link' href='/register' size='small'>
                Registreren
              </Button>
              <Button as='link' href='/login' size='small'>
                Aanmelden
              </Button>
            </div>
          )
        }
        <Link href='/'>
          <Icon name='notification' />
        </Link>
        <Link href='/'>
          <i>Dropdown</i>
        </Link>
      </div>
    </div>
  )
}

export default Navigation
