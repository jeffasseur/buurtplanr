import Image from 'next/image'
import Link from 'next/link'

import { type project } from '@/components/3d/MapWrapper'

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
            <h3>{project.name}</h3>
            <div className={styles.subCardHeader}>
              <p className={styles.date}>23.04.2023</p>
              <p className={styles.fase}>Fase 2: build it</p>
            </div>
          </div>
          <div className={styles.cardDescription}>
            <p>{project.info.description}</p>
          </div>
          <div className={styles.btnContainer}>
            <Link className={`${styles.btnMain} ${styles.cardButton}`} href={`/builder/${project.id}`}>
              <p>Deelnemen</p>
            </Link>
            <Link className={`${styles.btnSucces} ${styles.cardButton}`} href={`/builder/${project.id}`}>
              <p>Info</p>
            </Link>
          </div>
        </div>}
    </>
  )
}
