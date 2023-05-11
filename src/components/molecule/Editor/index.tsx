import clsx from 'clsx'

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
      {typeof activePID === 'number' && (
        <>
          <div
            className={clsx(styles.action)}
            onClick={() => {
              BUURTMAP.removeProductById(activePID)
              setPID(null)
            }}
          >
            <Icon name='trash' />
          </div>
          <div className={clsx(styles.action)} onClick={() => { setPID(null) }}>
            <Icon name='save' />
          </div>
        </>
      )}
      {typeof activePID !== 'number' && (
        <>
          <div className={clsx(styles.action)}>
            <Icon name='trash' />
          </div>
          <div className={clsx(styles.action)} onClick={() => { BUURTMAP.getSceneProducts() }}>
            <Icon name='save' />
          </div>
        </>
      )}
    </div>
  )
}
