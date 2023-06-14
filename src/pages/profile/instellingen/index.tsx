// import useSWR from 'swr'

import ReduxCheck from '@/helpers/ReduxCheck'
import UserLayout from '@components/layouts/user-layout'
import InstellingenOrg from '@components/organisms/Instellingen'

import styles from './styles.module.css'

const Instellingen = () => {
  const authReducer = ReduxCheck()
  const profileInfo = authReducer.data
  return (
    <UserLayout>
      <div className={styles.main}>
        <InstellingenOrg profileInfo={profileInfo} background='street' />
      </div>
    </UserLayout>
  )
}

export default Instellingen
