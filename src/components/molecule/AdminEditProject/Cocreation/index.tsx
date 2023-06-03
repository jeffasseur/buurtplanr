import Image from 'next/image'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const submitEditProject = async (FormData, id) => {
  let baseURL: string = '/'
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
    baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
  }
  const projectId: string = id
  const dataString = JSON.stringify(FormData)
  const response = await fetch(`${baseURL}projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${baseURL}`,
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: dataString
  })
  const data = await response.json()
  return data
}

const AdminProjectEditCocreation = ({ project }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [FormData, setFormData] = useState({
    title: project.title,
    description: project.description,
    dateOfPublication: project.dateOfPublication,
    dateOfStartCocreation: project.dateOfStartCocreation,
    dateOfEndCocreation: project.dateOfEndCocreation,
    dateOfStartVote: project.dateOfStartVote,
    dateOfEndVote: project.dateOfEndVote,
    budget: project.budget,
    informatie: project.informatie,
    document: project.document,
    location: {
      coordinates: {
        lat: project.location.coordinates.lat,
        lng: project.location.coordinates.lng
      },
      postalcode: project.location.postalcode,
      city: project.location.city,
      street: project.location.street
    },
    border: project.border,
    projectData: {
      type: project.projectData.type,
      file: project.projectData.file,
      description: project.projectData.description,
      link: project.projectData.link
    }
  })
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
          Al de mogelijkheden van bouwstukken en check zetten van uit de database
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
            <Input
              type='number'
              Size='small'
              placeholder='0'
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <Button as='button' size='small' theme='Primary' onClick={() => { void submitEditProject(FormData, project._id) }} className={styles.btnSave}>Opslaan</Button>
      </fieldset>
    </div>
  )
}

export default AdminProjectEditCocreation
