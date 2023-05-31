import Nav from '@/components/molecule/Navigation'
import SideNav from '@/components/molecule/Navigation/Sidenav'
import AdminProjects from '@components/organisms/Admin/AdminProjects'

import styles from './styles.module.css'

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
