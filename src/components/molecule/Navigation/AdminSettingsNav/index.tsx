import Link from 'next/link'

import Title from '@components/atoms/Title'

import styles from './styles.module.css'

const AdminSettingsNav = () => {
  return (
    <>
      <div className={styles.adminSettingsNav}>
        <Link href='/admin/settings'>
          <Title size='h3'>Algemeen</Title>
        </Link>
      </div>
    </>
  )
}

export default AdminSettingsNav
