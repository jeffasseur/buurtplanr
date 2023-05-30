import Image from 'next/image'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const Cocreation = ({ FormData, setFormData }) => {
  return (
    <div className={styles.cocreationContainer}>
      <fieldset className={styles.location}>
        <Title size='h3' weight='semibold'>Locatie</Title>
        <Button type='button' size='small' append='location'>Locatie kiezen</Button>
      </fieldset>
      <fieldset className={styles.cocreation}>
        <Title size='h3' weight='semibold'>Cocreatie</Title>
        <Button type='button' size='small' append='setting-3'>Cocreatie configureren</Button>
      </fieldset>
      <fieldset className={styles.buildingpieces}>
        <Title size='h3' weight='semibold'>Bouwstukken</Title>
        <p>Kies welke bouwstukken de gebruikers mee mogen werken</p>
        <label>
          Uit de db sleuren in checkboxes
        </label>
      </fieldset>
      <fieldset className={styles.checkedBuildingPieces}>
        <Title size='h3' weight='semibold'>Vereisten</Title>
        <p>Kies hier de hoeveelheid bouwstukken dat u wilt dat minstens aanwezig  moet zijn in de creaties</p>
        <div>
          <label className={styles.checkedBuildingPiece}>
            <div className={styles.imgContainer}>
              <Image src='/img/donut.webp' alt='bouwstuk' width={76} height={76} />
            </div>
            <Input type='number' Size='small' placeholder='0' />
          </label>
        </div>
      </fieldset>
    </div>
  )
}

export default Cocreation
