import Nav from '@/components/molecule/Navigation'
import SideNav from '@/components/molecule/Navigation/Sidenav'
import AdminNewProject from '@/components/organisms/Admin/AdminNewProject'

import styles from './styles.module.css'

const NewProject = () => {
  return (
    <div className={styles.createProject}>
      <nav className={styles.nav}>
        <Nav />
      </nav>
      <aside className={styles.aside}>
        <SideNav />
      </aside>
      <main className={styles.main}>
        <AdminNewProject />
      </main>
    </div>
  )
}

export default NewProject
