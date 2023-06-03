import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import { getFormattedDateFromTimestamp } from '@/helpers/dateFormatter'
import { type projectData } from '@/types/BUURTTYPES'

import styles from './styles.module.css'

interface ProjectProps {
  project: projectData | undefined
}

const ProjectRow = ({ project }: ProjectProps) => {
  const date = new Date(project?.dateOfCreation ?? '')

  const formatedDate = getFormattedDateFromTimestamp(date)

  return (
    <>
      {project &&
        <div className={styles.cardContainer}>
          <Title size='h4' weight='regular' className={styles.title}>{project.title}</Title>
          <div>
            <p className={styles.fase}>{project.fase}</p>
          </div>
          <div>
            <p className={styles.date}>{formatedDate}</p>
          </div>
          <div className={styles.btnContainer}>
            <Button as='link' size='small' append='setting-3' theme='Warning' href={`/admin/projects/edit/${project._id}`}>
              <span>Bewerken</span>
            </Button>
            <Button as='link' append='arrow-right' size='small' href={`/admin/project/${project._id}`}>
              <span>Project pagina</span>
            </Button>
          </div>
        </div>}
    </>
  )
}

export default ProjectRow
