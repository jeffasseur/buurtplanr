import styles from './styles.module.css'

const Thermometer = () => {
  return (
    <div className={styles.thermoContainer}>
      <div className={styles.thermo}>
        <div className={styles.thermoFill} />
        <p className={styles.thermoTitle}>Budget</p>
      </div>
    </div>
  )
}
export default Thermometer
