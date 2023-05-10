import Icon from '@/components/atoms/Icon'
import { type BuurtMap } from '@/utils/BuurtMap'

import styles from './styles.module.css'

interface EditorProps {
  activePID: number | null
  setPID: (val: number | null) => void
  BUURTMAP: BuurtMap
}

export const Editor = ({ activePID, setPID, BUURTMAP }: EditorProps) => {
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

      <div className={styles.action} onClick={() => { BUURTMAP.getSceneProducts() }}>
        <Icon name='save' />
      </div>
    </div>
  )
}
