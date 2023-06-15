import useSWR from 'swr'

import SearchBar from '@/components/atoms/SearchBar'
import Occurrence from '@/components/molecule/Occurrence'

import styles from './styles.module.css'

let baseURL: string = '/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': `${baseURL}`,
      'Access-Control-Allow-Methods': 'GET'
    }
  })
  return await res.json()
}

const AdminOccurrences = () => {
  const { data, isLoading, error } = useSWR(`${baseURL}creaties/`, fetcher)
  return (
    <div className={styles.adminOccerrences}>
      <div className={styles.adminOccurrences_search}>
        <SearchBar />
      </div>
      <div className={styles.adminOccurrences_header}>
        <p> </p>
        <p>Gebruiker</p>
        <p>Datum</p>
        <p>Gebeurtenis</p>
        <p> </p>
        <p>label</p>
        <p> </p>
      </div>
      <div className={styles.occurrencesContainer}>
        {isLoading && <p>Loading...</p>}
        {
          (data?.status === 'error' || data?.status !== 'success') &&
          (
            <p>
              {data?.message}
            </p>
          )
        }
        {data?.data &&
          data.data.map((occurrence: object, index) => (
            <Occurrence occurrence={occurrence} key={index} />
          ))}
        {error && <p>Er is iets misgegaan met het ophalen van de gebeurtenissen</p>}
      </div>
    </div>
  )
}

export default AdminOccurrences
