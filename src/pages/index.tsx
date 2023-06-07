import { useState } from 'react'
import useSWR from 'swr'

import styles from '@/assets/styles/pages/dashboard/Dashboard.module.css'
import { MapWrapper } from '@/components/3d/MapWrapper'
import UserLayout from '@/components/layouts/user-layout'
import Icon from '@components/atoms/Icon'
import ProjectColumn from '@components/molecule/ProjectCard/Column'

const fetcher = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

const Dashboard = () => {
  let baseURL: string = '/'
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
    baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
  }

  const { data, isLoading, error } = useSWR(`${baseURL}projects/`, fetcher)
  const [filter, setFilter] = useState('Informeren')

  return (
    <>
      <UserLayout>
        <MapWrapper mapType='overview' projectArray={data?.data} />
        <section className={styles.content}>
          <div className={styles.projectHeader}>
            <h2>Projecten</h2>
            <div className={styles.filterContainer}>
              <select className={styles.filter} value={filter} onChange={(e) => { setFilter(e.target.value) }}>
                <option value=''>filter op </option>
                <option value='Fase 1: Informeren'>Fase 1: Informeren</option>
                <option value='Fase 2: Cocreatie'>Fase 2: Cocreatie</option>
                <option value='Fase 3: Stemmen'>Fase 3: Stemmen</option>
                <option value='Fase 4: Vervolg'>Fase 4: Vervolg</option>
              </select>
              <div className='search'>
                <Icon name='search' />
              </div>
            </div>
          </div>
          <div className={styles.projectList}>
            {
              isLoading && <div>Loading...</div>
            }
            {
              data?.status === 'error' && <div>Er is iets mis gegaan met het ophalen van de projecten</div>
            }
            {data?.data.map((project) => {
              return <ProjectColumn key={project._id} project={project} />
            })}
            {
              error && <div>Er is iets mis gegaan met het ophalen van de projecten</div>
            }
          </div>
        </section>
      </UserLayout>
    </>
  )
}
export default Dashboard
