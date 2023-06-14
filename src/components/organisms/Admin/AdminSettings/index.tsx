import { useState } from 'react'

import Algemeen from '@/components/molecule/AdminSettings/Algemeen'
// import Huisstijl from '@/components/molecule/AdminSettings/Huisstijl'
import AdminSettingsNav from '@/components/molecule/Navigation/AdminSettingsNav'

import styles from './styles.module.css'

const AdminSettings = ({ buurtplanr }) => {
  const [displayedComponent, setDisplayedComponent] = useState('Algemeen') // ['Algemeen', 'Huisstijl'
  const handleComponentChange = (component: string) => {
    setDisplayedComponent(component)
  }
  return (
    <div className={styles.adminSettings}>
      <AdminSettingsNav handleComponentChange={handleComponentChange} />
      <div className={styles.settingsContainer}>
        {displayedComponent === 'Algemeen' && <Algemeen buurtplanr={buurtplanr} />}
      </div>
    </div>
  )
}

export default AdminSettings
