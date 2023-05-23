import { useEffect, useState } from 'react'

import Icon from '@/components/atoms/Icon'
import { type BuurtMap } from '@/utils/BuurtMap'

import styles from './styles.module.css'

interface EditorProps {
  activePID: number | null
  setPID: (val: number | null) => void
  BUURTMAP: BuurtMap
  targetObject: object | null
}

export const Editor = ({ activePID, setPID, BUURTMAP, targetObject }: EditorProps) => {
  const [bool, setBool] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string>('')

  useEffect(() => {
    if (BUURTMAP.dragOBJ) { setFeedback(BUURTMAP.dragOBJ.modelType) } else { setFeedback('') }

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
            className={styles.actionIcon}
            onClick={() => {
              if (activePID) BUURTMAP.removeProductById(activePID)
              setPID(null)
            }}
          >
            <Icon name='trash' />
          </div>
          <div className={styles.actionName}>remove</div>
        </div>
        <div className={styles.action}>
          <div className={styles.actionIcon} onClick={() => { setBool(true) }}>
            <Icon name='move' />
          </div>
          <div className={styles.actionName}>move</div>
        </div>
        <div className={styles.action}>
          <div className={styles.actionIcon} onClick={() => { BUURTMAP.getSceneProducts() }}>
            <Icon name='save' />
          </div>
          <div className={styles.actionName}>save</div>
        </div>
      </div>
      <div className={`${BUURTMAP.dragOBJ ? 'active' : styles.hidden}`}><p>{feedback}</p></div>
    </div>
  )
}
