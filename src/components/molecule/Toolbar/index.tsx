import { useState } from 'react'

import { Product } from '@/components/atoms/Product'
import Icon from '@components/atoms/Icon'

import styles from './styles.module.css'

const Toolbar = () => {
  const filterTypesArr = [
    'furniture',
    'ground',
    'light',
    'tree',
    'water'
  ] as const

  type filtersTypes = typeof filterTypesArr[number]

  const [filter, setFilter] = useState<filtersTypes | null>(null)
  console.log(filter)

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.misc}>
        <div className={styles.interaction}>
          <div className={styles.search}>
            <p>Zoeken...</p>
          </div>
          {filterTypesArr.map((f, key) => {
            if (f === filter) {
              return (
                <div key={key} className={`${styles.filter} ${styles.activeFilter}`} onClick={() => { setFilter(null) }}>
                  <Icon name={f} />
                </div>
              )
            }

            return (
              <div key={key} className={styles.filter} onClick={() => { setFilter(f) }}>
                <Icon name={f} />
              </div>
            )
          }
          )}
          <p>{filter}</p>
        </div>
        <Icon name='chevron-down' />
      </div>
      <Product />
    </div>
  )
}

export default Toolbar
