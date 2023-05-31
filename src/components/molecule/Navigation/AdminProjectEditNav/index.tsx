import Link from 'next/link'

import Title from '@components/atoms/Title'

import styles from './styles.module.css'

interface Props {
  handleComponentChange: (component: string) => void
  id: string
}

let active = 'General'

const AdminProjectEditNav = ({ handleComponentChange, id }: Props) => {
  const projectId: string = id
  return (
    <>
      <div className={styles.adminProjectEditNav}>
        <Link href={'/admin/projects/edit/' + projectId} onClick={() => { handleComponentChange('General'); active = 'General' }}>
          {
            active === 'General' &&
            (
              <Title size='h3'>Algemeen</Title>
            )
          }
          {
            active !== 'General' &&
            (
              <Title className={styles.inactive} size='h3'>Algemeen</Title>
            )
          }
        </Link>
        <Link href={'/admin/projects/edit/' + projectId} onClick={() => { handleComponentChange('Description'); active = 'Description' }}>
          {
            active === 'Description' &&
            (
              <Title size='h3'>Beschrijving</Title>
            )
          }
          {
            active !== 'Description' &&
            (
              <Title className={styles.inactive} size='h3'>Beschrijving</Title>
            )
          }
        </Link>
        <Link href={'/admin/projects/edit/' + projectId} onClick={() => { handleComponentChange('Information'); active = 'Information' }}>
          {
            active === 'Information' &&
            (
              <Title size='h3'>Informatie</Title>
            )
          }
          {
            active !== 'Information' &&
            (
              <Title className={styles.inactive} size='h3'>Informatie</Title>
            )
          }
        </Link>
        <Link href={'/admin/projects/edit/' + projectId} onClick={() => { handleComponentChange('Cocreation'); active = 'Cocreation' }}>
          {
            active === 'Cocreation' &&
            (
              <Title size='h3'>Cocreatie</Title>
            )
          }
          {
            active !== 'Cocreation' &&
            (
              <Title className={styles.inactive} size='h3'>Cocreatie</Title>
            )
          }
        </Link>
      </div>
    </>
  )
}

export default AdminProjectEditNav
