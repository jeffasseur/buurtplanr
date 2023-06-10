import { useState } from 'react'

import { Product } from '@/components/atoms/Product'
import Icon, { type Icons } from '@components/atoms/Icon'

import styles from './styles.module.css'

interface toolProps {
  productWeight: number
}

const Toolbar = ({ productWeight }: toolProps) => {
  const filterTypesArr = [
    'furniture',
    'ground',
    'light',
    'nature',
    'water'
  ]

  const [filter, setFilter] = useState<string | null>(null)

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.misc}>
        <div className={styles.interaction}>
          <div className={styles.search}>
            <p>Zoeken...</p>
            <Icon name='search' />
          </div>
          {filterTypesArr.map((f: Icons, key) => {
            if (f === filter) {
              return (
                <div key={key} className={styles.filter}>
                  <div className={`${styles.filterIcon} ${styles.activeFilter}`} onClick={() => { setFilter(null) }}>
                    <Icon name={f} />
                  </div>
                  <div className={styles.filterName}>{f}</div>
                </div>
              )
            }
            return (
              <div key={key} className={styles.filter}>
                <div className={styles.filterIcon} onClick={() => { setFilter(f) }}>
                  <Icon name={f} />
                </div>
                <div className={styles.filterName}>{f}</div>
              </div>
            )
          }
          )}
        </div>
        <Icon name='arrow-down' />
      </div>
      <Product productType={filter} productWeight={productWeight} />
    </div>
  )
}

export default Toolbar
