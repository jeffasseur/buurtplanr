import useSWR from 'swr'

import SearchBar from '@/components/atoms/SearchBar'
import AdminUser from '@/components/molecule/AdminUser'

import styles from './styles.module.css'

const apiUrl = 'http://127.0.0.1:3002/burgers'

const fetcher = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

const AdminUsers = () => {
  const { data, isLoading, error } = useSWR(apiUrl, fetcher)
  return (
    <div className={styles.adminUsers}>
      <div className={styles.adminUser_search}>
        <SearchBar />
      </div>
      <div className={styles.adminUser_header}>
        <p> </p>
        <p>Gebruiker</p>
        <p>Email</p>
        <p>Geregistreerd</p>
        <p>Status</p>
        <p> </p>
      </div>
      <div className={styles.UsersContainer}>
        {isLoading && <p>Loading...</p>}
        {data?.data &&
          data.data.map((user, index) => (
            <AdminUser user={user} key={index} />
          ))}
        {error && <p>Er is iets misgegaan met het ophalen van de gebruikers</p>}
      </div>
    </div>
  )
}

export default AdminUsers
