import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const TrackerBall = ({ state, text, number }) => {
  return (
    <div className={styles.trackerCircleZindex}>
      {
        state === 'active' &&
        (
          <div className={styles.trackerCircleWrapper}>
            <div className={styles.trackerCircleActive}>
              <Title
                as='h5'
                size='h1'
                weight='semibold'
                className={styles.trackerNumberActive}
              >{number}
              </Title>
            </div>
            <p>
              {text}
            </p>
          </div>
        )
      }
      {
        state === 'nonactive' &&
        (
          <div className={styles.trackerCircleWrapper}>
            <div className={styles.trackerCircleNonactive}>
              <Title
                as='h5'
                size='h1'
                weight='semibold'
                className={styles.trackerNumberNonactive}
              >{number}
              </Title>
            </div>
            <p>
              {text}
            </p>
          </div>
        )
      }
      {
        state === 'completed' &&
        (
          <div className={styles.trackerCircleWrapper}>
            <div className={styles.trackerCircleCompleted}>
              <Title
                as='h5'
                size='h1'
                weight='semibold'
                className={styles.trackerNumberCompleted}
              >{number}
              </Title>
            </div>
            <p>
              {text}
            </p>
          </div>
        )
      }
      {
        state === 'activeTransparent' &&
        (
          <div className={styles.trackerCircleWrapper}>
            <div className={styles.trackerCircleActiveTransparent}>
              <Title
                as='h5'
                size='h1'
                weight='semibold'
                className={styles.trackerNumberActive}
              >{number}
              </Title>
            </div>
            <p>
              {text}
            </p>
          </div>
        )
      }
    </div>
  )
}

TrackerBall.displayName = 'TrackerBall'

export default TrackerBall
