import { Product } from '@/components/atoms/Product'

import styles from './styles.module.css'

const Toolbar = () => {
  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.interaction}>
        <div className={styles.search}>
          <p>Zoeken...</p>
        </div>
        <div className={styles.filter} />
        <div className={styles.filter} />
        <div className={styles.filter} />
        <div className={styles.filter} />
      </div>

      <Product />
    </div>
  )
}

export default Toolbar
