import Image from 'next/image'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import { getFormattedDateFromTimestamp } from '@/helpers/dateFormatter'

import styles from './styles.module.css'

const Occurrence = ({ occurrence }) => {
  const date = new Date(occurrence?.dateOfCreation ?? '')
  const formatedDate = getFormattedDateFromTimestamp(date)
  return (
    <>
      {
        occurrence &&
        (
          <div className={styles.OccContainer}>
            <div className={styles.OccContainer_img}>
              {
                !occurrence.burger &&
                (
                  <Icon name='profile-circle' />
                )
              }
              {
                occurrence.burger &&
                (
                  <Image src='/img/donut.webp' alt='beschrijving' width={61} height={61} />
                )
              }
            </div>
            <div className={styles.OccContainer_title}>
              <h4>{occurrence.burger.firstname} {occurrence.burger.lastname}</h4>
            </div>
            <div className={styles.OccContainer_date}>
              <p>{formatedDate}</p>
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
        )
      }
    </>
  )
}

export default Occurrence
