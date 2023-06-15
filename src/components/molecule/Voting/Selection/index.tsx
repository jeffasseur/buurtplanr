import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import ReduxCheck from '@/helpers/ReduxCheck'
import CreatieSelector from '@components/molecule/CreatieSelector'

import styles from './styles.module.css'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

interface VotingSelectionProps {
  creaties: any[]
  creatie?: string
  onChange?: (creatie: string) => void
  handleComponentChange: (component: string) => void
}

const VotingSelection = ({ creaties, creatie, onChange, handleComponentChange }: VotingSelectionProps) => {
  const authReducer = ReduxCheck()
  const token = authReducer.token
  const [creatieValue, setCreatieValue] = useState(creatie)
  const handleCreatieChange = (creatie: string) => {
    setCreatieValue(creatie)
  }
  const submitVote = async (cv: string) => {
    const response = await fetch(`${baseURL}creaties/vote/${cv}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': `${baseURL}`
      }
    })
    const data = await response.json()
    return data
  }
  return (
    <>
      <div className={styles.selectionWrapper}>
        <Title as='h2' size='h3' weight='semibold'>Stem op het project dat jou het beste lijkt.</Title>
        <div className={styles.btnWrapper}>
          <Button
            as='button'
            theme='Primary'
            size='large'
            onClick={() => { void submitVote(creatieValue ?? ''); handleComponentChange('End') }}
            disabled={creatieValue === ''}
          >Bevestigen
          </Button>
        </div>
        <CreatieSelector creaties={creaties} onChange={handleCreatieChange} />
      </div>
    </>
  )
}

export default VotingSelection
