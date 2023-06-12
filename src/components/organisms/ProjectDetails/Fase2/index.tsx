import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const ProjectDetailsFase2 = ({ project }) => {
  const pid: string = project._id
  return (
    <>
      <div className={styles.cocreationWrapper}>
        <Title as='h2' size='h2' weight='semibold' className={styles.title}>Cocreatie</Title>
        <div className={styles.bouwMee}>
          <p>Bouw hier mee aan het project: {project.title}</p>
          <Button
            as='link'
            append='builder'
            href={`/builder/${pid}`}
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

export default ProjectDetailsFase2
