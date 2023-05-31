import Nav from '@/components/molecule/Navigation'
import SideNav from '@/components/molecule/Navigation/Sidenav'
import AdminOccurrences from '@components/organisms/Admin/AdminOccurrences'

import styles from './styles.module.css'

const AdminActivities = () => {
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
          <AdminOccurrences />
        </main>
      </div>
    </>
  )
}
export default AdminActivities
