import Link from 'next/link'

import Title from '@components/atoms/Title'

import styles from './styles.module.css'

interface Props {
  handleComponentChange: (component: string) => void
}

let active = 'Algemeen'

const AdminSettingsNav = ({ handleComponentChange }: Props) => {
  return (
    <>
      <div className={styles.adminSettingsNav}>
        <Link href='/admin/settings' onClick={() => { handleComponentChange('Algemeen'); active = 'Algemeen' }}>
          {
            active === 'Algemeen' &&
            (
              <Title size='h3'>Algemeen</Title>
            )
          }
          {
            active !== 'Algemeen' &&
            (
              <Title className={styles.inactive} size='h3'>Algemeen</Title>
            )
          }
        </Link>
        <Link href='/admin/settings' onClick={() => { handleComponentChange('Huisstijl'); active = 'Huisstijl' }}>
          {
            active === 'Huisstijl' &&
            (
              <Title size='h3'>Huisstijl</Title>
            )
          }
          {
            active !== 'Huisstijl' &&
            (
              <Title className={styles.inactive} size='h3'>Huisstijl</Title>
            )
          }
        </Link>
      </div>
    </>
  )
}

export default AdminSettingsNav
