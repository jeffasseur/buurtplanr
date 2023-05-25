import Nav from '@/components/molecule/Navigation'
import SideNav from '@/components/molecule/Navigation/Sidenav'
import AdminSettings from '@/components/organisms/Admin/AdminSettings'

import styles from './styles.module.css'

const AdminSettingsPage = () => {
  return (
    <div className={styles.adminSettings}>
      <nav className={styles.nav}>
        <Nav />
      </nav>
      <aside className={styles.aside}>
        <SideNav />
      </aside>
      <main className={styles.main}>
        <AdminSettings />
      </main>
    </div>
  )
}

export default AdminSettingsPage
