import { useState } from 'react'
import useSWR from 'swr'

import styles from '@/assets/styles/pages/dashboard/Dashboard.module.css'
import { MapWrapper } from '@/components/3d/MapWrapper'
import Nav from '@/components/molecule/Navigation'
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

  const { data } = useSWR(`${baseURL}projects/`, fetcher)
  const [filter, setFilter] = useState('Wachten tot opstart')

  return (
    <>
      <Nav />
      <MapWrapper mapType='overview' projectArray={data?.data} />
      <section className={styles.content}>
        <div className={styles.projectHeader}>
          <h2>Projecten</h2>
          <div className={styles.filterContainer}>
            <select className={styles.filter} value={filter} onChange={(e) => { setFilter(e.target.value) }}>
              <option value=''>filter op </option>
              <option value='Wachten tot opstart ...'>Fase 0: Wachten tot opstart</option>
              <option value='Informeren'>Fase 1: Informeren</option>
              <option value='Cocreatie'>Fase 2: Cocreatie</option>
              <option value='Stemmen'>Fase 3: Stemmen</option>
              <option value='Vervolg'>Fase 4: Vervolg</option>
            </select>
            <div className='search'>
              <Icon name='search' />
            </div>
          </div>
        </div>
        <div className={styles.projectList}>
          {data?.data.map((project) => {
            return <ProjectColumn key={project._id} project={project} />
          })}
        </div>
      </section>
    </>
  )
}
export default Dashboard
