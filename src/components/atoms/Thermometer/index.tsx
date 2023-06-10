import styles from './styles.module.css'

interface ThermoProps {
  productWeight: number
}

const Thermometer = ({ productWeight }: ThermoProps) => {
  return (
    <div className={styles.thermoContainer}>
      <div className={styles.thermo}>
        {productWeight <= 25 && <div className={`${styles.thermoFill} ${styles.sm}`} style={{ width: `${productWeight}%` }} />}
        {productWeight > 25 && productWeight <= 50 && <div className={`${styles.thermoFill} ${styles.md}`} style={{ width: `${productWeight}%` }} />}
        {productWeight > 50 && productWeight <= 75 && <div className={`${styles.thermoFill} ${styles.xl}`} style={{ width: `${productWeight}%` }} />}
        {productWeight > 75 && <div className={`${styles.thermoFill} ${styles.full}`} style={{ width: `${productWeight}%` }} />}
        <p className={styles.thermoTitle}>Budget</p>
      </div>
    </div>
  )
}
export default Thermometer
