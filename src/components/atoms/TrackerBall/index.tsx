import { cva, cx, type VariantProps } from 'class-variance-authority'
import { type Ref, forwardRef } from 'react'

import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const trackerBallStyle = cva(styles.trackerCircle, {
  variants: {
    circle: {
      base: styles['trackerCircle']
    },
    state: {
      active: styles['trackerCircleActive'],
      nonactive: styles['trackerCircleNonactive'],
      completed: styles['trackerCircleComplete']
    },
    text: {
      active: styles['trackerNumberActive'],
      nonactive: styles['trackerNumberNonactive'],
      completed: styles['trackerNumberComplete']
    }
  },
  defaultVariants: {
    circle: 'base',
    state: 'nonactive',
    text: 'nonactive'
  }
})

interface TrackerBallProps extends VariantProps<typeof trackerBallStyle> {
  className?: string
}

const TrackerBall = forwardRef<unknown, TrackerBallProps>(
  ({ className, text, state, circle }, ref) => {
    const classNamesCircle = cx([trackerBallStyle({ circle, state }), className])
    const classNamesText = cx([trackerBallStyle({ text }), className])
    return (
      <div className={styles.trackerCircleWrapper}>
        <div className={classNamesCircle}>
          <Title as='h5' size='h1' weight='semibold' className={classNamesText}>1</Title>
        </div>
        <p>Opzet</p>
      </div>
    )
  }
)

export default TrackerBall
