import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const ProjectDetailsFase3 = ({ project }) => {
  const pid: string = project._id
  return (
    <>
      <div className={styles.cocreationWrapper}>
        <Title as='h2' size='h2' weight='semibold' className={styles.title}>Stemmen</Title>
        <div className={styles.bouwMee}>
          <p>Stem hier mee aan het project: {project.title}</p>
          <Button
            as='link'
            append='medal-star'
            href={`/voting/${pid}`}
            theme='Primary'
            size='small'
            className={styles.button}
          >Deelnemen
          </Button>
        </div>
      </div>
    </>
  )
}

export default ProjectDetailsFase3
