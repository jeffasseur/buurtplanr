import Nav from '@/components/molecule/Navigation'
import SideNav from '@/components/molecule/Navigation/Sidenav'
import AdminUsers from '@components/organisms/Admin/AdminUsers'

import styles from './styles.module.css'

const AdminUsersDashboard = () => {
  return (
    <>
      <div className={styles.adminUsers}>
        <nav className={styles.nav}>
          <Nav />
        </nav>
        <aside className={styles.aside}>
          <SideNav />
        </aside>
        <main className={styles.main}>
          <AdminUsers />
        </main>
      </div>
    </>
  )
}
export default AdminUsersDashboard
