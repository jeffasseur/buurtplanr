import TrackerBall from '@/components/atoms/TrackerBall'

import styles from './styles.module.css'

const Tracker = () => {
  return (
    <div className={styles.tracker}>
      <TrackerBall state='active' text='active' />
    </div>
  )
}

export default Tracker
