import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'
// import { getFormattedDateFromTimestamp } from '@/helpers/dateFormatter'

import styles from './styles.module.css'

const submitEditProject = async (FormData, id) => {
  let baseURL: string = '/'
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
    baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
  }
  const projectId: string = id
  const dataString = JSON.stringify(FormData)
  const response = await fetch(`${baseURL}/projects/${projectId}`, {
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

const AdminEditProjectGeneral = ({ project }) => {
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
    <div className={styles.generalContainer}>
      <fieldset className={styles.title}>
        <Title as='h3' size='h3' weight='semibold'>Projectnaam</Title>
        <Input
          type='text'
          Size='large'
          placeholder='Projectnaam'
          value={FormData.title}
          onChange={(event) => { setFormData({ ...FormData, title: event.target.value }) }}
          autoFocus
          required
        />
      </fieldset>
      <fieldset className={styles.date}>
        <Title as='h3' size='h3' weight='semibold'>Datums</Title>
        <div className={styles.publishDate}>
          <label>Publiceer datum</label>
          <Input
            type='date'
            Size='small'
            value={FormData.dateOfPublication}
            onChange={(event) => { setFormData({ ...FormData, dateOfPublication: event.target.value }) }}
          />
        </div>
        <div className={styles.cocreationDate}>
          <div className={styles.cocreationDateStart}>
            <label>Startdatum: Cocreatie</label>
            <Input
              type='date'
              Size='small'
              value={FormData.dateOfStartCocreation}
              onChange={(event) => { setFormData({ ...FormData, dateOfStartCocreation: event.target.value }) }}
            />
          </div>
          <div className={styles.cocreationDateEnd}>
            <label>Einddatum: Cocreatie</label>
            <Input
              type='date'
              Size='small'
              value={FormData.dateOfEndCocreation}
              onChange={(event) => { setFormData({ ...FormData, dateOfEndCocreation: event.target.value }) }}
            />
          </div>
        </div>
        <div className={styles.voteDate}>
          <div className={styles.voteDateStart}>
            <label>Startdatum: Stemmen</label>
            <Input
              type='date'
              Size='small'
              value={FormData.dateOfStartVote}
              onChange={(event) => { setFormData({ ...FormData, dateOfStartVote: event.target.value }) }}
            />
          </div>
          <div className={styles.voteDateEnd}>
            <label>Einddatum: Stemmen</label>
            <Input
              type='date'
              Size='small'
              value={FormData.dateOfEndVote}
              onChange={(event) => { setFormData({ ...FormData, dateOfEndVote: event.target.value }) }}
            />
          </div>
        </div>
      </fieldset>
      <fieldset>
        <Title as='h3' size='h3' weight='semibold'>Budget</Title>
        <Input
          type='number'
          Size='large'
          placeholder='0'
          value={project.budget}
          onChange={(event) => { setFormData({ ...FormData, budget: event.target.value }) }}
        />
      </fieldset>
      <fieldset>
        <Button
          as='button'
          size='small'
          theme='Primary'
          onClick={() => { void submitEditProject(FormData, project._id) }}
          className={styles.btnSave}
        >Opslaan
        </Button>
      </fieldset>
    </div>
  )
}

export default AdminEditProjectGeneral
