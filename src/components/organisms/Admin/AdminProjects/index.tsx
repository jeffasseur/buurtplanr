import useSWR from 'swr'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import ProjectRow from '@/components/molecule/ProjectCard/Row'

import styles from './styles.module.css'

let baseURL: string = '/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': 'https://buurtplanr.com, http://buurtplanr.com, https://www.buurtplanr.com, http://www.buurtplanr.com'
    }
  })
  return await res.json()
}

const AdminProjects = () => {
  const { data, isLoading, error } = useSWR(`${baseURL}projects/`, fetcher)
  return (
    <div className={styles.adminProjects}>
      <div className={styles.header}>
        <Title size='h3'>Start een nieuw project</Title>
        <Button as='link' href='/admin/projects/create' append='save' size='small'>Project starten</Button>
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
