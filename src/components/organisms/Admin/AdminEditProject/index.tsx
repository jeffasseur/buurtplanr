import { useState } from 'react'

import Cocreation from '@/components/molecule/AdminEditProject/Cocreation'
import Description from '@/components/molecule/AdminEditProject/Description'
import General from '@/components/molecule/AdminEditProject/General'
import Information from '@/components/molecule/AdminEditProject/Information'
import AdminProjectEditNav from '@/components/molecule/Navigation/AdminProjectEditNav'

import styles from './styles.module.css'

const AdminEditProject = ({ project }) => {
  const projectData = project
  const [displayedComponent, setDisplayedComponent] = useState('General')
  const handleComponentChange = (component: string) => {
    setDisplayedComponent(component)
  }
  return (
    <div className={styles.editProjectContainer}>
      <div className={styles.header}>
        <AdminProjectEditNav handleComponentChange={handleComponentChange} id={projectData._id} />
      </div>
      <div className={styles.body}>
        {displayedComponent === 'General' && <General project={project} />}
        {displayedComponent === 'Description' && <Description project={project} />}
        {displayedComponent === 'Information' && <Information project={project} />}
        {displayedComponent === 'Cocreation' && <Cocreation project={project} />}
      </div>
    </div>
  )
}

export default AdminEditProject
