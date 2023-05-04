import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import styles from '@/assets/styles/pages/admin/Dashboard.module.css'
import { MapWrapper } from '@/components/3d/MapWrapper'

const inter = Inter({ subsets: ['latin'] })

// development data
// const projects = [
//   { name: 'Project 1', status: 'completed' },
//   { name: 'Project 2', status: 'inProgress' },
//   { name: 'Project 3', status: 'completed' },
//   { name: 'Project 4', status: 'inProgress' },
// ]
// end development data

async function getProjects() {
  const res = await fetch('https://localhost:3002/projects/');

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const AdminDashboard = async () => {
  const [filter, setFilter] = useState('all');
  const projects = await getProjects();

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') {
      return true
    } else {
      return project.status === filter
    }
  });

  return (
    <>
      <MapWrapper mapType="overview" />
      <div className={styles.searchWrapper}>
        <h3>Zoek naar een project</h3>
        <div className="search">
          <input type="text" name="search" id="search" placeholder="Zoeken..." />
        </div>
      </div>
      <section>
        <div className="projectenHeader">
          <h2>Projecten</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All projects</option>
            <option value="completed">Completed projects</option>
            <option value="inProgress">Projects in progress</option>
          </select>
        </div>
        <ul>
          {filteredProjects.map((project) => (
            <li key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.status}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
export default AdminDashboard;