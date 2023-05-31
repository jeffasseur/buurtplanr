import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const submitEditProject = async (FormData, id) => {
  const projectId: string = id
  const dataString = JSON.stringify(FormData)
  const response = await fetch(`http://127.0.0.1:3002/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://127.0.0.1:3002/',
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: dataString
  })
  const data = await response.json()
  return data
}

const AdminEditProjectDescription = ({ project }) => {
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
    <div className={styles.descriptionContainer}>
      <fieldset className={styles.description}>
        <Title size='h3' weight='semibold'>Beschrijving</Title>
        <Input
          type='text'
          Size='large'
          placeholder='text editor...'
          value={FormData.description}
          onChange={
            (event) => { setFormData({ ...FormData, description: event.target.value }) }
          }
        />
      </fieldset>
      <fieldset>
        <Button as='button' size='small' theme='Primary' onClick={() => { void submitEditProject(FormData, project._id) }} className={styles.btnSave}>Opslaan</Button>
      </fieldset>
    </div>
  )
}

export default AdminEditProjectDescription
