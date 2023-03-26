import Link from "next/link"
import styles from "./styles.module.css"
import { project } from '@/components/3d/MapWrapper';

interface ProjectProps {
  project: project | undefined
}

export const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <h3>{project.name}</h3>
        <p>thema: parkinrichting</p>
      </div>
      <div className={styles.cardImg}>
        <img src="" alt="image" className={styles.cardImg} />
      </div>
      <div className={styles.cardDescription}>
        <p>{project.info.description}</p>
      </div>
      <Link className={styles.cardButton} href={`/builder/${project.id}`} >
        <p> start building </p>
      </Link>
    </div>
  )
}