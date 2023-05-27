import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const Setup = () => {
  return (
    <div>
      <fieldset>
        <Title size='h3' weight='semibold'>Projectnaam</Title>
        <Input type='text' Size='large' placeholder='Projectnaam' />
      </fieldset>
      <fieldset className={styles.date}>
        <Title size='h3' weight='semibold'>Datums</Title>
        <div className={styles.publishDate}>
          <label>Publiceer datum</label>
          <Input type='date' Size='small' placeholder='Projectnaam' />
        </div>
        <div className={styles.cocreationDate}>
          <div className={styles.cocreationDateStart}>
            <label>Startdatum: Cocreatie</label>
            <Input type='date' Size='small' placeholder='Projectnaam' />
          </div>
          <div className={styles.cocreationDateEnd}>
            <label>Einddatum: Cocreatie</label>
            <Input type='date' Size='small' placeholder='Projectnaam' />
          </div>
        </div>
        <div className={styles.voteDate}>
          <div className={styles.voteDateStart}>
            <label>Startdatum: Stemmen</label>
            <Input type='date' Size='small' placeholder='Projectnaam' />
          </div>
          <div className={styles.voteDateEnd}>
            <label>Einddatum: Stemmen</label>
            <Input type='date' Size='small' placeholder='Projectnaam' />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Budget</Title>
        <Input type='number' Size='large' placeholder='0' />
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Beschrijving</Title>
        <Input type='text' Size='large' placeholder='text editor...' />
      </fieldset>
      <fieldset>
        <Title size='h3' weight='semibold'>Type</Title>
      </fieldset>
    </div>
  )
}

export default Setup
