import TrackerBall from '@components/atoms/TrackerBall'

import styles from './styles.module.css'

const ProjectDetailsTracker = ({ step }) => {
  return (
    <div>
      {
        step === 0 &&
        (
          <div className={styles.step0}>
            <div className={styles.tracker}>
              <TrackerBall state='nonactive' text='Kom meer te weten' number='1' />
              <div className={styles.barNonactive}>iets</div>
              <TrackerBall state='nonactive' text='Breng je idee in beeld' number='2' />
              <div className={styles.barNonactive}>iets</div>
              <TrackerBall state='nonactive' text='Stem op het beste idee' number='3' />
              <div className={styles.barNonactive}>iets</div>
              <TrackerBall state='nonactive' text='Volg de uitwerking' number='4' />
            </div>
          </div>
        )
      }
      {
        step === 1 &&
        (
          <div className={styles.tracker}>
            <TrackerBall state='activeTransparent' text='Kom meer te weten' number='1' />
            <div className={styles.barNonactive}>iets</div>
            <TrackerBall state='nonactive' text='Breng je idee in beeld' number='2' />
            <div className={styles.barNonactive}>iets</div>
            <TrackerBall state='nonactive' text='Stem op het beste idee' number='3' />
            <div className={styles.barNonactive}>iets</div>
            <TrackerBall state='nonactive' text='Volg de uitwerking' number='4' />
          </div>
        )
      }
      {
        step === 2 &&
        (
          <div className={styles.tracker}>
            <TrackerBall state='completed' text='Kom meer te weten' number='1' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='activeTransparent' text='Breng je idee in beeld' number='2' />
            <div className={styles.barNonactive}>iets</div>
            <TrackerBall state='nonactive' text='Stem op het beste idee' number='3' />
            <div className={styles.barNonactive}>iets</div>
            <TrackerBall state='nonactive' text='Volg de uitwerking' number='4' />
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
            <TrackerBall state='activeTransparent' text='Stem op het beste idee' number='3' />
            <div className={styles.barNonactive}>iets</div>
            <TrackerBall state='nonactive' text='Volg de uitwerking' number='4' />
          </div>
        )
      }
      {
        step === 4 &&
        (
          <div className={styles.tracker}>
            <TrackerBall state='completed' text='Kom meer te weten' number='1' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='completed' text='Breng je idee in beeld' number='2' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='completed' text='Stem op het beste idee' number='3' />
            <div className={styles.barActive}>iets</div>
            <TrackerBall state='activeTransparent' text='Volg de uitwerking' number='4' />
          </div>
        )
      }
    </div>
  )
}

export default ProjectDetailsTracker
