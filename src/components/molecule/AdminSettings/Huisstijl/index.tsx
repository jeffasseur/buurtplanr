import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const Huisstijl = () => {
  return (
    <div className={styles.huisstijlContainer}>
      <Title size='h2' weight='semibold'>Huisstijl aanpassen</Title>
      <form action='#' method='POST'>
        <Title size='h3' weight='regular' className={styles.bigLabel}>Kleuren</Title>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Primary kleur</label>
          <input type='color' value='#3457bf' className={styles.inputColor} />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Secundaire kleur</label>
          <input type='color' value='#575ab9' className={styles.inputColor} />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>Tertiaire kleur</label>
          <input type='color' value='#329459' className={styles.inputColor} />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Title size='h3' weight='regular' className={styles.bigLabel}>Logo</Title>
          <Input type='file' Size='medium' accept='image/*' />
        </fieldset>
        <Button type='submit' theme='Primary' size='small'>Opslaan</Button>
      </form>
    </div>
  )
}

export default Huisstijl
