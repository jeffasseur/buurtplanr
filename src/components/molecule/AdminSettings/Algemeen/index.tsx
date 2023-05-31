import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const Algemeen = () => {
  return (
    <div className={styles.algemeenContainer}>
      <Title size='h2' weight='semibold'>Algemene instellingen</Title>
      <form action='#' method='POST'>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Naam van stad, gemeente of organisatie</label>
          <Input type='text' Size='medium' placeholder='Buurtplanr' />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Link naar website van uw stad, gemeente of organisatie</label>
          <Input type='text' Size='medium' placeholder='https://buurtplanr.be' />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Bericht op login/ registratie scherm</label>
          <Input type='text' Size='medium' placeholder='Welkom' />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Afbeelding op login/ registratie scherm</label>
          <Input type='file' Size='medium' accept='image/*' />
        </fieldset>
        <Button type='submit' theme='Primary' size='small'>Opslaan</Button>
      </form>
    </div>
  )
}

export default Algemeen
