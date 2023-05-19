import { useEffect, useState } from 'react'
import { type Vec2 } from 'three'

import Icon from '@/components/atoms/Icon'
import { type BuurtMap } from '@/utils/BuurtMap'

import styles from './styles.module.css'

interface EditorProps {
  activePID: number | null
  setPID: (val: number | null) => void
  BUURTMAP: BuurtMap
  targetObject: object
}

export const Editor = ({ activePID, setPID, BUURTMAP, targetObject }: EditorProps) => {
  const [position, setPosition] = useState<Vec2>({ x: 0, y: 0 })
  const [bool, setBool] = useState<boolean>(false)
  useEffect(() => {
    const handleWindowMouseMove = event => {
      if (BUURTMAP.dragOBJ && bool) {
        setPosition({
          x: event.clientX,
          y: event.clientY
        })
        BUURTMAP.updateProductPosition()
      }
    }
    if (!BUURTMAP.dragOBJ) setBool(false)
    window.addEventListener('mousemove', handleWindowMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
    }
  }, [BUURTMAP, bool, targetObject])

  const left = position.x.toString() + 'px'
  const top = position.y.toString() + 'px'
  return (
    <div className={styles.container} style={{ left, top, position: 'absolute' }}>
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
        <Icon name='save' />
      </div>
    </div>
  )
}
