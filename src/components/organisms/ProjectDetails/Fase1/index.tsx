import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const ProjectDetailsFase1 = () => {
  return (
    <>
      <Title as='h2' size='h2' weight='semibold' className={styles.title}>Informatie</Title>
      <div className={styles.descriptionContainer}>
        <Title as='h3' size='h3' weight='medium' className={styles.descriptionTitle}>Beschrijving</Title>
        <p className={styles.descriptionText}>beschrijving van uit de database</p>
      </div>
    </>
  )
}

export default ProjectDetailsFase1
