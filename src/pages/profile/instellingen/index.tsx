import Nav from '@/components/molecule/Navigation'
import InstellingenOrg from '@components/organisms/Instellingen'

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

const Instellingen = () => {
  return (
    <div className={styles.main}>
      <Nav />
      <InstellingenOrg profileInfo={profileInfo} background='street' />
    </div>
  )
}

export default Instellingen
