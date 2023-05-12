import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import styles from '@/assets/styles/pages/admin/styles.module.css'
import Nav from '@/components/molecule/Navigation'
import SideNav from '@/components/molecule/Navigation/Sidenav'
import AdminProjects from '@components/organisms/adminProjects'

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
  const res = await fetch('http://localhost:3002/projects/'); 
  const data = await res.json();
  return {
    props: {
      projects: data
    }
  }
}

const AdminDashboard = ({ projects }) => {
  const [filter, setFilter] = useState('Wachten tot opstart');
  // console.log(projects.data)
  const fetchedProjects = projects.data;

  const filteredProjects = fetchedProjects.filter((project) => {
    if (filter === 'Wachten tot opstart') {
      return true
    } else {
      return project.fase === filter
    }
  });

  return (
    <>
      <Nav />
      <aside>
        <SideNav />
      </aside>
      <main>
        <AdminProjects />
      </main>
    </>
  )
}
export default AdminDashboard;