import useSWR from 'swr'

import Nav from '@/components/molecule/Navigation'
import InstellingenOrg from '@components/organisms/Instellingen'

import styles from './styles.module.css'

const fetcher = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

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
  let baseURL: string = '/'
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
    baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
  }
  const { data, isLoading, error } = useSWR(`${baseURL}burgers/`, fetcher)

  console.log(data)

  return (
    <div className={styles.main}>
      <Nav />
      {isLoading && <p>Loading...</p>}
      <InstellingenOrg profileInfo={profileInfo} background='street' />
      {error && <p>Er is iets misgegaan met het ophalen van de gebruiker</p>}
    </div>
  )
}

export default Instellingen
