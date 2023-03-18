import Link from "next/link"
import styles from "./styles.module.css"

interface ProjectProps {
  project: object | null | undefined
}

export const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <div className={`${styles.cardContainer} `}>
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