import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const ProjectDetailsFase4 = ({ project }) => {
  return (
    <>
      <div className={styles.vervolgWrapper}>
        <Title as='h2' size='h2' weight='semibold' className={styles.title}>Winnar</Title>
        <div className={styles.winnaar}>
          Hier komt de winnende creatie
        </div>
      </div>
    </>
  )
}

export default ProjectDetailsFase4
