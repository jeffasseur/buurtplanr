import { Product } from '@/components/atoms/Product'
import Icon from '@components/atoms/Icon'

import styles from './styles.module.css'

const Toolbar = () => {
  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.misc}>
        <div className={styles.interaction}>
          <div className={styles.search}>
            <p>Zoeken...</p>
          </div>
          <div className={styles.filter} />
          <div className={styles.filter} />
          <div className={styles.filter} />
          <div className={styles.filter} />
        </div>
        <Icon name='chevron-down' />
      </div>
      <Product />
    </div>
  )
}

export default Toolbar
