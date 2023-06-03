import Link from 'next/link'

import Icon from '../../../atoms/Icon'

import styles from './styles.module.css'

const SideNavigation = () => {
  return (
    <div className={styles.sidenav}>
      <Link className={styles.activeLink} href='/admin/'>
        <Icon name='folder' />
        Projecten
      </Link>
      <Link className={styles.link} href='/admin/activities'>
        <Icon name='trend-up' />
        Activiteit
      </Link>
      <Link className={styles.link} href='/admin/users'>
        <Icon name='profile-user' />
        Gebruikers
      </Link>
      <Link className={styles.link} href='/admin/settings'>
        <Icon name='setting-2' />
        Instellingen
      </Link>
    </div>
  )
}

export default SideNavigation
