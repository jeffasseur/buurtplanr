import Image from 'next/image'

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
                  <Icon name='profile-circle' className={styles.image} />
                )
              }
              {
                occurrence.burger?.image &&
                (
                  <Image src={occurrence.burger.image} alt='beschrijving' fill className={styles.image} />
                )
              }
            </div>
            <div className={styles.OccContainer_title}>
              {
                !occurrence.burger &&
                (
                  <h4>Gebruiker verwijderd</h4>
                )
              }
              <h4>{occurrence.burger?.firstname} {occurrence.burger?.lastname}</h4>
            </div>
            <div className={styles.OccContainer_date}>
              <p>{formatedDate}</p>
            </div>
            <div className={styles.OccContainer_occurrence}>
              {
                occurrence?.project === null &&
                (
                  <p>Bijhorend project is verwijderd</p>
                )
              }
              {
                occurrence?.project !== null &&
                (
                  <p>Creatie {occurrence.project.title}</p>
                )
              }
            </div>
            <div className={styles.OccContainer_divider}>
              <div className={styles.divider} />
            </div>
            <div className={styles.OccContainer_label}>
              <p>creatie</p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Occurrence
