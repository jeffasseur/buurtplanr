import Link from 'next/link'

import Title from '@components/atoms/Title'

import styles from './styles.module.css'

const AdminSettings = () => {
  return (
    <div className={styles.adminSettings}>
      <div className={styles.header}>
        <Link href='/admin/settings'>
          <Title size='h3'>Algemeen</Title>
        </Link>
        <Link href='/admin/settings'>
          <Title size='h3'>Huisstijl</Title>
        </Link>
      </div>
      <div className={styles.settingsContainer}>
        settings container
      </div>
    </div>
  )
}

export default AdminSettings
