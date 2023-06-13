import styles from './styles.module.css'

interface ThermoProps {
  productWeight: number
}

const Thermometer = ({ productWeight }: ThermoProps) => {
  let thermoFillClasses = styles.thermoFill

  switch (true) {
    case productWeight <= 25:
      thermoFillClasses += ` ${styles.sm}`
      break
    case productWeight > 25 && productWeight <= 50:
      thermoFillClasses += ` ${styles.md}`
      break
    case productWeight > 50 && productWeight <= 75:
      thermoFillClasses += ` ${styles.xl}`
      break
    case productWeight > 75:
      thermoFillClasses += ` ${styles.full}`
      break
  }

  return (
    <div className={styles.thermoContainer}>
      <div className={styles.thermo}>
        <div className={thermoFillClasses} style={{ width: `${productWeight}%` }} />
        <p className={styles.thermoTitle}>Budget</p>
      </div>
    </div>
  )
}
export default Thermometer
