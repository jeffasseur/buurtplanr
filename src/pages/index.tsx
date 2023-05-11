import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import styles from '@/assets/styles/pages/admin/Dashboard.module.css'
import { MapWrapper } from '@/components/3d/MapWrapper'
import Nav from '@/components/molecule/Navigation'

const inter = Inter({ subsets: ['latin'] })

// development data
// const projects = [
//   { name: 'Project 1', status: 'completed' },
//   { name: 'Project 2', status: 'inProgress' },
//   { name: 'Project 3', status: 'completed' },
//   { name: 'Project 4', status: 'inProgress' },
// ]
// end development data

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3002/projects/')
  const data = await res.json()
  return {
    props: {
      projects: data
    }
  }
}

const Dashboard = ({ projects }) => {
  const [filter, setFilter] = useState('Wachten tot opstart')
  // console.log(projects.data)
  const fetchedProjects = projects.data

  const filteredProjects = fetchedProjects.filter((project) => {
    if (filter === 'Wachten tot opstart') {
      return true
    } else {
      return project.fase === filter
    }
  })

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
          {filteredProjects.map((project) => (
            <li key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>{project.fase}</p>
              <p>{project.dateOfStartCocreation}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
export default Dashboard
