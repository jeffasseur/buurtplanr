import { useEffect, useState } from 'react'

import Icon from '@/components/atoms/Icon'
import { type productUploadData } from '@/types/BUURTTYPES'
import { type BuurtMap } from '@/utils/BuurtMap'
import { useUser } from '@components/zustand/buurtplanrContext'

import styles from './styles.module.css'

interface EditorProps {
  activePID: number | undefined
  setPID: (val: number | undefined) => void
  productWeight: number
  setProductWeight: (val: number) => void
  BUURTMAP: BuurtMap
  targetObject: object | null
  creationData?: productUploadData[]
}

export const Editor = ({ activePID, setPID, productWeight, setProductWeight, BUURTMAP, targetObject, creationData }: EditorProps) => {
  const creationID = useUser(state => state.creationID)
  const projectID = useUser(state => state.projectID)
  const userID = useUser(state => state.userID)
  const [bool, setBool] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string | undefined>('')
  let postURL: string
  let putURL: string
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK && projectID && userID) {
    postURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}creaties/new/${projectID}/${userID}`
  }
  if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK && creationID) {
    putURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}creaties/${creationID}`
  }

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
              BUURTMAP.rotateProduct('counter-clockwise')
            }}
          >
            <Icon name='rotate-left' />
          </div>
          <div className={styles.actionName}>rotate left</div>
        </div>

        <div className={styles.action}>
          <div
            className={`${styles.actionIcon} ${BUURTMAP.dragOBJ ? 'active' : styles.disabled} `}
            onClick={() => {
              BUURTMAP.rotateProduct('clockwise')
            }}
          >
            <Icon name='rotate-right' />
          </div>
          <div className={styles.actionName}>rotate right</div>
        </div>

        <div className={styles.action}>
          <div className={`${styles.actionIcon} ${BUURTMAP.dragOBJ ? 'active' : styles.disabled} `} onClick={() => { setBool(true) }}>
            <Icon name='move' />
          </div>
          <div className={styles.actionName}>move</div>
        </div>

        <div className={styles.action}>
          <div
            className={`${styles.actionIcon} ${BUURTMAP.dragOBJ ? 'active' : styles.disabled} `}
            onClick={() => {
              if (activePID) BUURTMAP.removeProductById(activePID)
              setProductWeight(productWeight - 10)
              setPID(undefined)
            }}
          >
            <Icon name='trash' />
          </div>
          <div className={styles.actionName}>remove</div>
        </div>

        <div className={styles.action}>
          <div
            className={styles.actionIcon}
            onClick={() => {
              if (creationData) {
                BUURTMAP.sendCreation(putURL, false)
                setFeedback('creatie geüpdatet')
                return
              }
              BUURTMAP.sendCreation(postURL, true)
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
