import Nav from '@/components/molecule/Navigation'
import Instellingen from '@components/organisms/Instellingen'

import styles from './styles.module.css'

const profileInfo = {
  username: 'jeffasseur',
  email: 'jef.mail.com',
  adress: 'straatnaam',
  postalcode: '1600',
  housenummer: '30',
  password: 'password',
  profilePicture: '/img/park.png'
}

const instellingen = () => {
  return (
    <div className={styles.main}>
      <Nav />
      <Instellingen profileInfo={profileInfo} background='street' />
    </div>
  )
}

export default instellingen
