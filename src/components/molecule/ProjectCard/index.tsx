import styles from "./styles.module.css"

{/* send coordinates as props to mapblueprint so that the map is reusable */ }
export const ProjectCard = () => {
  return (
    <div className={`${styles.cardContainer} ${styles.hidden}`}>
      <div className={styles.cardHeader}>
        <h3>kruidtuin</h3>
        <p>thema: parkinrichting</p>
      </div>
      <div className={styles.cardImg}>
        <img src="" alt="image" className={styles.cardImg} />
      </div>
      <div className={styles.cardDescription}>
        <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p>
      </div>
      <div className={styles.cardButton}>
        <p>start building</p>
      </div>
    </div >
  )
}