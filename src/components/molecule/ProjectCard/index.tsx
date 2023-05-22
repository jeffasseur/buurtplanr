import Image from 'next/image'

import Button from '@/components/atoms/Button'
import { type project } from '@/types/BUURTTYPES'

import styles from './styles.module.css'

interface ProjectProps {
  project: project | undefined
}

export const ProjectCard = ({ project }: ProjectProps) => {
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
              <p className={styles.fase}>Fase 2: build it</p>
            </div>
          </div>
          <div className={styles.cardDescription}>
            <p>{project.info.description}</p>
          </div>
          <div className={styles.btnContainer}>
            <Button as='link' size='small' href={`/builder/${project.id}`}>
              <span>Deelnemen</span>
            </Button>
            <Button as='link' theme='Tertiary' size='small' href={`/builder/${project.id}`}>
              <span>Info</span>
            </Button>
          </div>
        </div>}
    </>
  )
}
