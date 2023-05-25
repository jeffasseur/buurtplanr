import useSWR from 'swr'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import ProjectRow from '@/components/molecule/ProjectCard/Row'

import styles from './styles.module.css'

// const apiUrl = '/api/getAllProjects'
const apiUrl = 'http://127.0.0.1:3002/projects/'

const fetcher = async (url) => {
  const res = await fetch(url)
  return await res.json()
}
// export async function getServerSideProps () {
//   const res = await fetch(apiUrl)
//   return {
//     props: {
//       data: await res.json()
//     }
//   }
// }

const AdminProjects = () => {
  const { data, isLoading, error } = useSWR(apiUrl, fetcher)
  return (
    <div className={styles.adminprojects}>
      <div className={styles.header}>
        <Title size='h3'>Start een nieuw project</Title>
        <Button as='link' href='/admin/projecten/create' append='save' size='small'>Project starten</Button>
      </div>
      <div className={styles.projectContainer}>
        <div className={styles.cardContainer}>
          <p>project naam</p>
          <div>
            <p className={styles.fase}>fase</p>
          </div>
          <div>
            <p className={styles.date}>startdatum</p>
          </div>
          <div className={styles.searchContainer}>
            <form action=''>
              <input type='text' name='search' id='search' placeholder='Zoek project' />
            </form>
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
        {data?.data &&
          data.data.map((project, index) => (
            <ProjectRow project={project} key={index} />
          ))}
        {error && <p>Er is iets misgegaan met het ophalen van de projecten</p>}
      </div>
    </div>
  )
}

export default AdminProjects
