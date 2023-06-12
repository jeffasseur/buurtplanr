import { useEffect, useState } from 'react'

import Cocreation from '@/components/molecule/AdminNewProject/Cocreation'
import Setup from '@/components/molecule/AdminNewProject/Setup'
import Summary from '@/components/molecule/AdminNewProject/Summary'
import Tracker from '@/components/molecule/Tracker'
import { useNewProjectForm } from '@components/zustand/buurtplanrContext'

import styles from './styles.module.css'

const AdminNewProject = () => {
  const setSetupProgress = useNewProjectForm((state) => state.setSetupProgress)
  const setupProgress = useNewProjectForm((state) => state.setupProgress)
  const updateCocreationProgress = useNewProjectForm((state) => state.setCocreationProgress)
  const cocreationProgress = useNewProjectForm((state) => state.cocreationProgress)
  const formStage = useNewProjectForm((state) => state.formStage)
  const updateFormStage = useNewProjectForm((state) => state.updateFormStage)
  const formData = useNewProjectForm((state) => state.formData)

  const [hyFormStage, setFormStage] = useState<number>(0)
  const FormElements = [
    <Setup key={0} FormData={setupProgress} setSetupProgress={setSetupProgress} updateFormStage={updateFormStage} />,
    <Cocreation key={1} FormData={cocreationProgress} setFormData={updateCocreationProgress} updateFormStage={updateFormStage} />,
    <Summary key={2} FormData={formData} updateFormStage={updateFormStage} />
  ]

  useEffect(() => {
    setFormStage(formStage)
  }, [formStage])

  return (
    <div className={styles.newProjectContainer}>
      <div className={styles.tracker}>
        <Tracker step={hyFormStage} />
      </div>
      <div className={styles.body}>
        {hyFormStage >= 0 && FormElements[hyFormStage]}
      </div>
    </div>
  )
}

export default AdminNewProject
