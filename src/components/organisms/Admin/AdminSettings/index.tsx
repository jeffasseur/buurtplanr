import Algemeen from '@/components/molecule/AdminSettings/Algemeen'
import AdminSettingsNav from '@/components/molecule/Navigation/AdminSettingsNav'

import styles from './styles.module.css'

const AdminSettings = ({ buurtplanr }) => {
  return (
    <div className={styles.adminSettings}>
      <AdminSettingsNav />
      <div className={styles.settingsContainer}>
        <Algemeen buurtplanr={buurtplanr} />
      </div>
    </div>
  )
}

export default AdminSettings
