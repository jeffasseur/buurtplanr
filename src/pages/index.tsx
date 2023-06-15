import { useState } from 'react'
import useSWR from 'swr'

import styles from '@/assets/styles/pages/dashboard/Dashboard.module.css'
import { MapWrapper } from '@/components/3d/MapWrapper'
import UserLayout from '@/components/layouts/user-layout'
import ReduxCheck from '@/helpers/ReduxCheck'
import ProjectColumn from '@components/molecule/ProjectCard/Column'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

const fetcher = async (url) => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${baseURL}`
    }
  })
  return await res.json()
}

const Dashboard = () => {
  const authReducer = ReduxCheck()
  const userId = authReducer.data._id
  const { data, isLoading, error } = useSWR(`${baseURL}projects`, fetcher)
  const [filter, setFilter] = useState('Fase 1: Informeren')

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
            </div>
          </div>
          <div className={styles.projectList}>
            {
              isLoading && <div>Loading...</div>
            }
            {
              data?.status === 'error' &&
              (<div>Er is iets mis gegaan met het ophalen van de projecten</div>)
            }
            {
              data?.data.map((project) => {
                return <ProjectColumn key={project._id} project={project} userId={userId} />
              })
            }
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
