import Image from 'next/image'

import Title from '@/components/atoms/Title'
import UserLayout from '@/components/layouts/user-layout'

import styles from './styles.module.css'

const UserProfile = () => {
  return (
    <UserLayout>
      <header className={styles.header}>
        <Image src='/img/cover-buurtplanr.webp' alt='profielfoto' fill className={styles.headerBg} />
        <div>
          <Image src='/img/map-pin.svg' alt='profielfoto' width={250} height={250} className={styles.headerImage} />
          <Title as='h1' size='h1' weight='semibold' className={styles.headerTitle}>Jef Fasseur</Title>
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
          bijdragen van deze gebruiker
        </div>
      </main>
    </UserLayout>
  )
}

export default UserProfile
