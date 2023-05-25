import Image from 'next/image'

import Button from '@/components/atoms/Button'

import styles from './styles.module.css'

const Occurrence = () => {
  return (
    <>
      <div className={styles.OccContainer}>
        <div className={styles.OccContainer_img}>
          <Image src='/img/donut.webp' alt='beschrijving' width={61} height={61} />
        </div>
        <div className={styles.OccContainer_title}>
          <h4>Username</h4>
        </div>
        <div className={styles.OccContainer_date}>
          <p>Datum</p>
        </div>
        <div className={styles.OccContainer_occurrence}>
          <p>Gebeurtenis</p>
        </div>
        <div className={styles.OccContainer_divider}>
          <div className={styles.divider} />
        </div>
        <div className={styles.OccContainer_label}>
          <p>Label</p>
        </div>
        <div className={styles.OccContainer_btn}>
          <Button as='link' href='/admin/occurrence' theme='Primary' size='small' append='eye'>bekijk</Button>
        </div>
      </div>
    </>
  )
}

export default Occurrence
