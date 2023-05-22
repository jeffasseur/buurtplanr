import styles from './styles.module.css'
import Link from 'next/link'
import Icon from '../../../atoms/Icon'

const SideNavigation = () => {
  return (
    <div className={styles.sidenav}>
      <Link className={styles.link} href="/admin/">
          <Icon name="folder" />
          Projecten
        </Link>
        <Link className={styles.link} href="/admin/activities">
          <Icon name="trend-up" />
          Activiteit
        </Link>
        <Link className={styles.link} href="/admin/users">
          <Icon name="profile-user" />
          Gebruikers
        </Link>
        <Link className={styles.link} href="/admin/settings">
          <Icon name="setting" />
          Instellingen
        </Link>
    </div>
  )
}

export default SideNavigation