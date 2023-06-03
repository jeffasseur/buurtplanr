import Image from 'next/image'

import Icon from '@/components/atoms/Icon'
import { getFormattedDateFromTimestamp } from '@/helpers/dateFormatter'

import styles from './styles.module.css'

const AdminUser = ({ user }) => {
  const date = new Date(user?.dateOfRegistration ?? '')
  const formatedDate = getFormattedDateFromTimestamp(date)

  return (
    <>
      {
        user &&
        (
          <div className={styles.adminUserContainer}>
            <div className={styles.adminUser_img}>
              {
                user.image &&
                (
                  <Image src={user.image} alt='placeholder' width={61} height={61} />
                )
              }
              {
                !user.image &&
                (
                  <Icon name='profile-circle' className={styles.profileIcon} />
                )
              }
            </div>
            <div className={styles.adminUser_name}>
              <h4>{user.firstname} {user.lastname}</h4>
            </div>
            <div className={styles.adminUser_email}>
              <p>{user.email}</p>
            </div>
            <div className={styles.adminUser_date}>
              <p>{formatedDate}</p>
            </div>
            <div className={styles.adminUser_role}>
              <p>Gebruiker</p>
            </div>
            <div className={styles.adminUser_settings}>
              <Icon name='setting-3' />
            </div>
          </div>
        )
      }
    </>
  )
}

export default AdminUser
