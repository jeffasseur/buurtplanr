import Image from 'next/image'

// import { MapWrapper } from '@/components/3d/MapWrapper'
import Title from '@/components/atoms/Title'
import Button from '@components/atoms/Button'
import { useNewProjectForm } from '@components/zustand/buurtplanrContext'

import styles from './styles.module.css'

const submitNewProject = async (data) => {
  const dataString = JSON.stringify(data)
  await fetch('/api/createProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000/, https://buurtplanr.com',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: dataString
  })
}

const Summary = ({ FormData, updateFormStage }) => {
  const resetProgress = useNewProjectForm((state) => state.resetProgress)
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.dates}>
        <Title size='h3' weight='semibold'>Data</Title>
        dates for loop
      </div>
      <div className={styles.budget}>
        <Title size='h3' weight='semibold'>Budget</Title>
        <p>€ {FormData.budget}</p>
      </div>
      <div className={styles.beschrijving}>
        <Title size='h3' weight='semibold'>Beschrijving</Title>
        <p>{FormData.description}</p>
      </div>
      <div className={styles.info}>
        <Title size='h3' weight='semibold'>Informatie</Title>
        <Title size='h4' weight='regular' className={styles.textGrey500}>Infotekst</Title>
        <p>{FormData.informatie}</p>
        <Title size='h4' weight='regular' className={styles.textGrey500}>Document/ afbeelding</Title>
        <div className={styles.imgContainer}>
          {
            FormData.document !== '' &&
            (
              <Image src={FormData.document} alt='afbeelding/ document' width={100} height={100} />
            )
          }
        </div>
      </div>
      <div className={styles.location}>
        <Title size='h3' weight='semibold'>Locatie</Title>
        <div className={styles.mapWrapper}>
          Hier komt de map met de ingestelde locatie
          {FormData.location.postalcode}
          {FormData.location.city}
          {FormData.location.street}
          {/* <MapWrapper mapType='overview' /> */}
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
      <div className={styles.footer}>
        <div className={styles.btnContainer}>
          <Button
            as='button'
            size='small'
            prepend='arrow-left'
            theme='Primary'
            onClick={() => {
              updateFormStage(1)
            }}
          >vorige stap
          </Button>
          <Button
            href='/admin'
            as='link'
            size='small'
            append='save'
            theme='Primary'
          >
            <p onClick={() => {
              void submitNewProject(FormData)
              resetProgress()
            }}
            >
              opslaan
            </p>

          </Button>
        </div>
      </div>
    </div>
  )
}

export default Summary
