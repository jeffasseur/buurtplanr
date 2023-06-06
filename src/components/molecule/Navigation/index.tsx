import Link from 'next/link'

import Button from '@/components/atoms/Button'
import DropdownNavUser from '@components/atoms/Dropdown/NavUser'

import Icon from '../../atoms/Icon'

import styles from './styles.module.css'

const isAdmin = true
const loggedIn = true

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <div>
        <Link href='/'>
          <Icon name='logo' className={styles.logo} />
        </Link>
      </div>
      <div className={styles.menu}>
        <Link href='/' className={styles.desktop}>
          <Icon name='home' />
        </Link>
        {
          isAdmin && loggedIn &&
          (
            <Button as='link' href='/admin' append='security-user' size='small' className={styles.desktopFlex}>
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
        <Link href='/' className={styles.desktop}>
          <Icon name='notification' />
        </Link>
        <DropdownNavUser />
      </div>
    </div>
  )
}

export default Navigation
