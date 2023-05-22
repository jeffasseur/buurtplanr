// import Head from 'next/head'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useState } from 'react'

import Nav from '@/components/molecule/Navigation'
import SideNav from '@/components/molecule/Navigation/Sidenav'
import AdminProjects from '@components/organisms/adminProjects'

import styles from './styles.module.css'

// development data
// const projects = [
//   { name: 'Project 1', status: 'completed' },
//   { name: 'Project 2', status: 'inProgress' },
//   { name: 'Project 3', status: 'completed' },
//   { name: 'Project 4', status: 'inProgress' },
// ]
// end development data

const AdminDashboard = () => {
  return (
    <>
      <div className={styles.adminProjects}>
        <nav className={styles.nav}>
          <Nav />
        </nav>
        <aside className={styles.aside}>
          <SideNav />
        </aside>
        <main className={styles.main}>
          <AdminProjects />
        </main>
      </div>
    </>
  )
}
export default AdminDashboard
