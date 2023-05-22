import Button from '@/components/atoms/Button'
import { type project } from '@/types/BUURTTYPES'

import styles from './styles.module.css'

interface ProjectProps {
  project: project | undefined
}

const ProjectRow = ({ project }: ProjectProps) => {
  return (
    <>
      {project &&
        <div className={styles.cardContainer}>
          <h3 className={styles.title}>{project.title}</h3>
          <div>
            <p className={styles.fase}>{project.fase}</p>
          </div>
          <div>
            <p className={styles.date}>{project.dateOfCreation}</p>
          </div>
          <div className={styles.btnContainer}>
            <Button as='link' size='small' append='setting' theme='Warning' href={`/builder/${project.id}`}>
              <span>Bewerken</span>
            </Button>
            <Button as='link' append='chevron-down' size='small' href={`/admin/project/${project.id}`}>
              <span>Project pagina</span>
            </Button>
          </div>
        </div>}
    </>
  )
}

export default ProjectRow
