import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const Algemeen = () => {
  return (
    <div className={styles.algemeenContainer}>
      <Title size='h2' weight='semibold'>Algemeen</Title>
      <form action='#'>
        <label>Naam van stad, gemeente of organisatie</label>
        <Button type='submit' theme='Primary' size='small'>Opslaan</Button>
      </form>
    </div>
  )
}

export default Algemeen
