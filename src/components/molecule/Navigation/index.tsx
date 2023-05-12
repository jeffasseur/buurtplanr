import styles from './styles.module.css'
import Link from 'next/link'
import Icon from '../../atoms/Icon'
import Button from '@/components/atoms/Button'

const isAdmin = true
const loggedIn = true

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <div>
        <Icon name="logo" className={styles.logo} />
      </div>
      <div className={styles.menu}>
        <Link href="/">
          <Icon name="home" />
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
          loggedIn &&
          (
            <div className={styles.accountBtns}>
              <Link href="/">
                <Icon name="notification" />
              </Link>
              <Button as='button' prepend='save' size='small' theme='Tertiary'>
                Jef Fasseur
              </Button>
            </div>
          )
        }
        {
          !loggedIn &&
          (
            <div className={styles.accountBtns}>
              <Button as='link' href="/register" size='small'>
                Registreren
              </Button>
              <Button as='link' href="/login" size='small'>
                Aanmelden
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navigation