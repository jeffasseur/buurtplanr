import { useState } from 'react'
import useSWR from 'swr'

import styles from '@/assets/styles/pages/admin/Dashboard.module.css'
import { MapWrapper } from '@/components/3d/MapWrapper'
import Nav from '@/components/molecule/Navigation'
import ProjectRow from '@components/molecule/ProjectCard/Row'

const fetcher = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

const Dashboard = () => {
  const baseURL = process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()
  const { data } = useSWR(`${baseURL}projects/`, fetcher)
  const [filter, setFilter] = useState('Wachten tot opstart')

  return (
    <>
      <Nav />
      <MapWrapper mapType='overview' />
      <div className={styles.searchWrapper}>
        <h3>Zoek naar een project</h3>
        <div className='search'>
          <input type='text' name='search' id='search' placeholder='Zoeken...' />
        </div>
      </div>
      <section>
        <div className='projectenHeader'>
          <h2>Projecten</h2>
          <select value={filter} onChange={(e) => { setFilter(e.target.value) }}>
            <option value='Wachten tot opstart ...'>Fase 0: Wachten tot opstart</option>
            <option value='Informeren'>Fase 1: Informeren</option>
            <option value='Cocreatie'>Fase 2: Cocreatie</option>
            <option value='Stemmen'>Fase 3: Stemmen</option>
            <option value='Vervolg'>Fase 4: Vervolg</option>
          </select>
        </div>
        <ul>
          {data?.data.map((project) => (
            <ProjectRow key={project._id} project={project} />
          ))}
        </ul>
      </section>
    </>
  )
}
export default Dashboard
