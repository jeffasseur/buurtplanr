import Image from 'next/image'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Cocreation from '@/components/molecule/AdminNewProject/Cocreation'
import Setup from '@/components/molecule/AdminNewProject/Setup'
import Summary from '@/components/molecule/AdminNewProject/Summary'

import styles from './styles.module.css'

const AdminNewProject = () => {
  const [createFormData, setCreateFormData] = useState({
    title: '',
    dateOfPublish: '',
    dateOfStartCocreation: '',
    dateOfEndCocreation: '',
    dateOfStartVote: '',
    dateOfEndVote: '',
    budget: 0,
    description: '',
    type: '',
    info: '',
    doc: '',
    location: {
      coordinates: {
        lat: 0,
        lng: 0
      },
      postalcode: 0,
      city: '',
      street: ''
    }
  })
  const [page, setPage] = useState(0)
  const FormElements = [<Setup key={0} createFormData={createFormData} setCreateFormData={setCreateFormData} />, <Cocreation key={1} createFormData={createFormData} setCreateFormData={setCreateFormData} />, <Summary key={2} createFormData={createFormData} setCreateFormData={setCreateFormData} />]
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
              onClick={
                () => { console.log(createFormData) }
              }
            >opslaan
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminNewProject
