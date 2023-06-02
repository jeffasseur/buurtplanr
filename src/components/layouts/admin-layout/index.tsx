import Nav from '@/components/molecule/Navigation'
import Sidenav from '@/components/molecule/Navigation/Sidenav'

import styles from './styles.module.css'

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className={styles.adminContainer}>
        <div className={styles.adminNav}>
          <Nav />
        </div>
        <aside className={styles.adminSidenav}>
          <Sidenav />
        </aside>
        <main className={styles.adminMain}>
          {children}
        </main>
      </div>
    </>
  )
}

export default AdminLayout
