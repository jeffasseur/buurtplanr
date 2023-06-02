// import { cva, cx, type VariantProps } from 'class-variance-authority'

import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

// const trackerBallStyle = cva(styles.trackerCircle, {
//   variants: {
//     state: {
//       active: styles['trackerCircleActive'],
//       nonactive: styles['trackerCircleNonactive'],
//       completed: styles['trackerCircleComplete']
//     }
//   }
// })

const TrackerBall = () => {
  return (
    <div className={styles.trackerCircleWrapper}>
      <div className={styles.trackerCircle}>
        <Title as='h5' size='h1' weight='semibold' className={styles.trackerNumberActive}>1</Title>
      </div>
      <p>Opzet</p>
    </div>
  )
}

export default TrackerBall
