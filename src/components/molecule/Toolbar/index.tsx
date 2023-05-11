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
          <div className={styles.filter}>
            <Icon name='tree' />
          </div>
          <div className={styles.filter}>
            <Icon name='light' />
          </div>
          <div className={styles.filter}>
            <Icon name='furniture' />
          </div>
          <div className={styles.filter}>
            <Icon name='ground' />
          </div>
          <div className={styles.filter}>
            <Icon name='water' />
          </div>
        </div>
        <Icon name='chevron-down' />
      </div>
      <Product />
    </div>
  )
}

export default Toolbar
