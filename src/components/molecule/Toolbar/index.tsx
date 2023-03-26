import Product from '@/components/atoms/Product'
import styles from './styles.module.css'

const Toolbar = () => {
  return (
    <div className={styles.toolbarContainer}>
      <Product />
    </div>
  )
}

export default Toolbar