import Image from 'next/image'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Cocreation from '@/components/molecule/AdminNewProject/Cocreation'
import Setup from '@/components/molecule/AdminNewProject/Setup'
import Summary from '@/components/molecule/AdminNewProject/Summary'

import styles from './styles.module.css'

const submitNewProject = async (data) => {
  const dataString = JSON.stringify(data)
  await fetch('http://localhost:3000/api/createProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: dataString
  })
}

const AdminNewProject = () => {
  const [FormData, setFormData] = useState({
    title: '',
    description: '',
    dateOfPublication: '',
    dateOfStartCocreation: '',
    dateOfEndCocreation: '',
    dateOfStartVote: '',
    dateOfEndVote: '',
    budget: 0,
    informatie: '',
    document: {},
    location: {
      coordinates: {
        lat: 51.02342,
        lng: 4.4841925
      },
      postalcode: '2800',
      city: 'Mechelen',
      street: 'vleeshalsesteenweg'
    },
    border: {},
    projectData: {
      type: 'Straat',
      file: null,
      description: 'korte beschrijving',
      link: 'https://vleeshalle.be'
    }
  })
  const [page, setPage] = useState(0)
  const FormElements = [<Setup key={0} FormData={FormData} setFormData={setFormData} />, <Cocreation key={1} FormData={FormData} setFormData={setFormData} />, <Summary key={2} FormData={FormData} setFormData={setFormData} />]
  return (
    <div className={styles.newProjectContainer}>
      <div className={styles.header}>
        <Image src='/img/donut.webp' alt='donut' width={250} height={220} />
      </div>
      <div className={styles.tracker}>
        <h1 className={styles.title}>Tracker</h1>
      </div>
      <div className={styles.body}>
        {FormElements[page]}
      </div>
      <div className={styles.footer}>
        {page === 0 &&
          (
            <div className={styles.btnContainer}>
              <Button as='link' href='/admin' size='small' theme='Primary'>annuleren</Button>
              <Button
                as='button'
                size='small'
                append='arrow-right'
                theme='Primary'
                onClick={() => {
                  setPage((currPage) => currPage + 1)
                }}
              >volgende stap
              </Button>
            </div>
          )}
        {page === 1 &&
        (
          <div className={styles.btnContainer}>
            <Button
              as='button'
              size='small'
              prepend='arrow-left'
              theme='Primary'
              onClick={() => {
                setPage((currPage) => currPage - 1)
              }}
            >vorige stap
            </Button>
            <Button
              as='button'
              size='small'
              append='arrow-right'
              theme='Primary'
              onClick={() => {
                setPage((currPage) => currPage + 1)
              }}
            >volgende stap
            </Button>
          </div>
        )}
        {page === 2 &&
        (
          <div className={styles.btnContainer}>
            <Button
              as='button'
              size='small'
              prepend='arrow-left'
              theme='Primary'
              onClick={() => {
                setPage((currPage) => currPage - 1)
              }}
            >vorige stap
            </Button>
            <Button
              as='button'
              size='small'
              append='save'
              theme='Primary'
              onClick={() => { void submitNewProject(FormData) }}
            >opslaan
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminNewProject
