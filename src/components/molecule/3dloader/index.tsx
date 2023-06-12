import styles from './styles.module.css'

export const Loader3d = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.bubble_left} />
      <div className={styles.bubble_right} />
    </div>
  )
}
