import styles from './styles.module.css'
import Link from 'next/link'
import Icon from '../../atoms/Icon'

const isAdmin = true

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
          isAdmin &&
          (<Link href="/admin" className={styles.btnAdmin}>
            Admin
            <Icon name="security-user" />
          </Link>)
        }
        <Link href="/">
          <Icon name="notification" />
        </Link>
        <Link href="/">
          <i>Dropdown</i>
        </Link>
      </div>
    </div>
  )
}

export default Navigation