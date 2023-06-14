'use client'

import Image from 'next/image'

import Title from '@/components/atoms/Title'
import UserLayout from '@/components/layouts/user-layout'
import ProfileBijdragen from '@/components/organisms/ProfileBijdragen'
import ReduxCheck from '@/helpers/ReduxCheck'

import styles from './styles.module.css'

// let baseURL: string = 'http://127.0.0.1:3002/'
// if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
//   baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
// }

const UserProfile = () => {
  const authReducer = ReduxCheck()
  return (
    <UserLayout>
      <header className={styles.header}>
        <div>
          <Image src='/img/types/PARK.png' alt='profielfoto' fill className={styles.headerBg} />
        </div>
        <div className={styles.headerWrapper}>
          <Image src={authReducer.data?.image} alt='profielfoto' width={250} height={250} className={styles.headerImage} />
          <Title as='h1' size='h1' weight='semibold' className={styles.headerTitle}>{authReducer.data?.firstname} {authReducer.data?.lastname}</Title>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <Title as='h2' size='h2' weight='semibold' className={styles.title}>Bijdragen</Title>
          <div>
            filter
          </div>
        </div>
        <div className={styles.bijdragen}>
          <ProfileBijdragen />
        </div>
      </main>
    </UserLayout>
  )
}

export default UserProfile
