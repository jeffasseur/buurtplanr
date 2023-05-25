import Image from 'next/image'

import Button from '@/components/atoms/Button'
import { type project } from '@/types/BUURTTYPES'
import { useUser } from '@components/zustand/buurtplanrContext'

import styles from './styles.module.css'

interface ProjectProps {
  project: project | undefined
}

const ProjectColumn = ({ project }: ProjectProps) => {
  const userID = useUser(state => state.userID)

  return (
    <>
      {project &&
        <div className={styles.cardContainer}>
          <div className={styles.cardImg}>
            <Image src='' alt='image' className={styles.cardImg} />
          </div>
          <div className={styles.cardHeader}>
            <h3>{project.title}</h3>
            <div className={styles.subCardHeader}>
              <p className={styles.date}>23.04.2023</p>
              <p className={styles.fase}>{project.fase}</p>
            </div>
          </div>
          <div className={styles.cardDescription}>
            <p>{project.informatie}</p>
          </div>
          <div className={styles.btnContainer}>
            <Button as='link' size='small' href={`/builder/${project._id}/${userID}`}>
              <span>Deelnemen</span>
            </Button>
            <Button as='link' theme='Tertiary' size='small' href={`/builder/${project._id}/${userID}`}>
              <span>Info</span>
            </Button>
          </div>
        </div>}
    </>
  )
}

export default ProjectColumn
