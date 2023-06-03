import TrackerBall from '@/components/atoms/TrackerBall'

import styles from './styles.module.css'

const Tracker = ({ step }) => {
  return (
    <div>
      {
        step === 0 &&
        (
          <div className={styles.tracker}>
            <TrackerBall state='active' text='Opzet' number='1' />
            <div className={styles.barNonactive}>iets</div>
            <TrackerBall state='nonactive' text='Cocreatie' number='2' />
            <div className={styles.barNonactive}>iets</div>
            <TrackerBall state='nonactive' text='Overzicht' number='3' />
          </div>
        )
      }
      {
        step === 1 &&
        (
          <div className={styles.tracker}>
            <TrackerBall state='completed' text='Opzet' number='1' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='active' text='Cocreatie' number='2' />
            <div className={styles.barNonactive}>iets</div>
            <TrackerBall state='nonactive' text='Overzicht' number='3' />
          </div>
        )
      }
      {
        step === 2 &&
        (
          <div className={styles.tracker}>
            <TrackerBall state='completed' text='Opzet' number='1' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='completed' text='Cocreatie' number='2' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='active' text='Overzicht' number='3' />
          </div>
        )
      }
      {
        step === 3 &&
        (
          <div className={styles.tracker}>
            <TrackerBall state='completed' text='Kom meer te weten' number='1' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='completed' text='Breng je idee in beeld' number='2' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='completed' text='Stem op het beste idee' number='3' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='completed' text='Volg de uitwerking' number='4' />
          </div>
        )
      }
    </div>
  )
}

export default Tracker
