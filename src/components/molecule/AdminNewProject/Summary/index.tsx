import Image from 'next/image'

import { MapWrapper } from '@/components/3d/MapWrapper'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const Summary = ({ createFormData, setCreateFormData }) => {
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.dates}>
        <Title size='h3' weight='semibold'>Data</Title>
        dates for loop
      </div>
      <div className={styles.budget}>
        <Title size='h3' weight='semibold'>Budget</Title>
        <p>€ {createFormData.budget}</p>
      </div>
      <div className={styles.beschrijving}>
        <Title size='h3' weight='semibold'>Beschrijving</Title>
        <p>{createFormData.description}</p>
      </div>
      <div className={styles.info}>
        <Title size='h3' weight='semibold'>Informatie</Title>
        <Title size='h4' weight='regular' className={styles.textGrey500}>Infotekst</Title>
        <p>{createFormData.info}</p>
        <Title size='h4' weight='regular' className={styles.textGrey500}>Document/ afbeelding</Title>
        <div className={styles.imgContainer}>
          <Image src={createFormData.doc} alt='afbeelding/ document' width={100} height={100} />
        </div>
      </div>
      <div className={styles.location}>
        <Title size='h3' weight='semibold'>Locatie</Title>
        <div className={styles.mapWrapper}>
          <MapWrapper mapType='overview' />
        </div>
      </div>
      <div className={styles.cocreation}>
        <Title size='h3' weight='semibold'>Cocreatie</Title>
        <p>Google Maps API</p>
      </div>
      <div className={styles.vereisten}>
        <Title size='h3' weight='semibold'>Vereisten</Title>
        <ul>
          <li>Bouwstenen en aantallen</li>
        </ul>
      </div>
    </div>
  )
}

export default Summary
