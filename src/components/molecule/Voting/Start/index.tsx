import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const VotingStart = ({ handleComponentChange }) => {
  return (
    <div className={styles.votingWrapper}>
      <Title as='h2' size='h3' weight='semibold' className={styles.votingTitle}>Stemmen</Title>
      <p>Stem nu op het beste project! Klik op het oogicoon rechts bovenaan bij een creatie, zo zie je deze in zijn geheel. Eenmaal je je keuze hebt gemaakt: selecteer jouw voorkeursproject en klik op bevestigen</p>
      <Button
        as='button'
        size='medium'
        theme='Primary'
        append='arrow-right'
        onClick={() => { handleComponentChange('Selection') }}
      >Starten
      </Button>
    </div>
  )
}

export default VotingStart
