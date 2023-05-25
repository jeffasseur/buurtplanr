import SearchBar from '@/components/atoms/SearchBar'
import Occurrence from '@/components/molecule/Occurrence'

import styles from './styles.module.css'

const AdminOccurrences = () => {
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
        <Occurrence />
      </div>
    </div>
  )
}

export default AdminOccurrences
