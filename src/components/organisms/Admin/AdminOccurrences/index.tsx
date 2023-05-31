import useSWR from 'swr'

import SearchBar from '@/components/atoms/SearchBar'
import Occurrence from '@/components/molecule/Occurrence'

import styles from './styles.module.css'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  return await res.json()
}

const AdminOccurrences = () => {
  const { data, isLoading, error } = useSWR('http://127.0.0.1:3002/creaties/', fetcher)
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
        {data?.data &&
          data.data.map((occurrence, index) => (
            <Occurrence occurrence={occurrence} key={index} />
          ))}
        {error && <p>Er is iets misgegaan met het ophalen van de gebeurtenissen</p>}
      </div>
    </div>
  )
}

export default AdminOccurrences
