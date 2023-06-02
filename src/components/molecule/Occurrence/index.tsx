import Image from 'next/image'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

import styles from './styles.module.css'

const Occurrence = ({ occurrence }) => {
  return (
    <>
      <div className={styles.OccContainer}>
        <div className={styles.OccContainer_img}>
          {
            occurrence.burger.image &&
            (
              <Image src='/img/donut.webp' alt='beschrijving' width={61} height={61} />
            )
          }
          {
            !occurrence.burger.image &&
            (
              <Icon name='profile-circle' />
            )
          }
        </div>
        <div className={styles.OccContainer_title}>
          <h4>{occurrence.burger.firstname} {occurrence.burger.lastname}</h4>
        </div>
        <div className={styles.OccContainer_date}>
          <p>{occurrence.dateOfCreation}</p>
        </div>
        <div className={styles.OccContainer_occurrence}>
          <p>Creatie {occurrence.project.title}</p>
        </div>
        <div className={styles.OccContainer_divider}>
          <div className={styles.divider} />
        </div>
        <div className={styles.OccContainer_label}>
          <p>creatie</p>
        </div>
        <div className={styles.OccContainer_btn}>
          <Button as='link' href='/admin/activities' theme='Primary' size='small' append='eye'>bekijk</Button>
        </div>
      </div>
    </>
  )
}

export default Occurrence
