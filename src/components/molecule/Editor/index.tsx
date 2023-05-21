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

  useEffect(() => {
    const handleWindowMouseMove = event => {
      if (BUURTMAP.dragOBJ && bool) {
        BUURTMAP.updateProductPosition()
      }
    }
    if (!BUURTMAP.dragOBJ) setBool(false)
    window.addEventListener('mousemove', handleWindowMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
    }
  }, [BUURTMAP, bool, targetObject])

  return (
    <div className={styles.container}>
      <div
        className={styles.action}
        onClick={() => {
          if (activePID) BUURTMAP.removeProductById(activePID)
          setPID(null)
        }}
      >
        <Icon name='trash' />
      </div>

      <div className={styles.action} onClick={() => { setBool(true) }}>
        <Icon name='move' />
      </div>

      <div className={styles.action} onClick={() => { BUURTMAP.getSceneProducts() }}>
        <Icon name='save' />
      </div>
    </div>
  )
}
