import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Cocreation from '@/components/molecule/AdminNewProject/Cocreation'
import Setup from '@/components/molecule/AdminNewProject/Setup'
// import Summary from '@/components/molecule/AdminNewProject/Summary'

import styles from './styles.module.css'

const AdminNewProject = () => {
  const [page, setPage] = useState(0)
  const FormElements = [<Setup key={0} />, <Cocreation key={1} />/*, <Summary key={2} /> */]
  return (
    <div className={styles.newProjectContainer}>
      <div className={styles.header}>
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
              type='submit'
            >opslaan
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminNewProject
