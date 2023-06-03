import { useEffect, useState } from 'react'

import Icon from '@/components/atoms/Icon'
import { type BuurtMap } from '@/utils/BuurtMap'
import { useUser } from '@components/zustand/buurtplanrContext'

import styles from './styles.module.css'

interface EditorProps {
  activePID: number | undefined
  setPID: (val: number | undefined) => void
  BUURTMAP: BuurtMap
  targetObject: object | null
}

export const Editor = ({ activePID, setPID, BUURTMAP, targetObject }: EditorProps) => {
  const projectID = useUser(state => state.projectID)
  const userID = useUser(state => state.userID)
  let baseURL: string
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK && projectID && userID) {
    baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}creaties/new/${projectID}/${userID}`
  }
  const [bool, setBool] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string | undefined>('')

  useEffect(() => {
    if (BUURTMAP.dragOBJ) { setFeedback(BUURTMAP.dragOBJ.modelName) } else { setFeedback('') }

    const handleWindowMouseMove = event => {
      if (BUURTMAP.dragOBJ && bool) { BUURTMAP.updateProductPosition() }
    }

    if (!BUURTMAP.dragOBJ) { setBool(false) }

    window.addEventListener('mousemove', handleWindowMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
    }
  }, [BUURTMAP, bool, targetObject])

  return (
    <div className={styles.container}>
      <div className={styles.actionContainer}>
        <div className={styles.action}>
          <div
            className={`${styles.actionIcon} ${BUURTMAP.dragOBJ ? 'active' : styles.disabled} `}
            onClick={() => {
              if (activePID) BUURTMAP.removeProductById(activePID)
              setPID(undefined)
            }}
          >
            <Icon name='trash' />
          </div>
          <div className={styles.actionName}>remove</div>
        </div>
        <div className={styles.action}>
          <div className={`${styles.actionIcon} ${BUURTMAP.dragOBJ ? 'active' : styles.disabled} `} onClick={() => { setBool(true) }}>
            <Icon name='move' />
          </div>
          <div className={styles.actionName}>move</div>
        </div>
        <div className={styles.action}>
          <div
            className={styles.actionIcon}
            onClick={() => {
              BUURTMAP.sendCreation(baseURL)
              setFeedback('creatie opgeslagen')
            }}
          >
            <Icon name='save' />
          </div>
          <div className={styles.actionName}>save</div>
        </div>
      </div>
      <div className={`${feedback ? styles.selected : styles.hidden}`}><p>{feedback}</p></div>
    </div>
  )
}
