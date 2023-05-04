import Icon from '@/components/atoms/Icon';
import styles from './styles.module.css'
import clsx from 'clsx';
import { BuurtMap } from '@/utils/BuurtMap';

interface EditorProps {
  activePID: number | null,
  setPID: (val: number | null) => void;
  BUURTMAP: BuurtMap
}

export const Editor = ({ activePID, setPID, BUURTMAP }: EditorProps) => {
  return (
    <div className={styles.container}>

      {typeof activePID === 'number'
        ?
        <>
          <div className={clsx(styles.action, styles.enabled)} onClick={() => { BUURTMAP.removeProductById(activePID), setPID(null) }}>
            <Icon name="trash" />
          </div>
          <div className={`${styles.action} ${styles.btnPrimary}`} onClick={() => { setPID(null) }}>
            <Icon name="save" />
          </div>
        </>
        :
        <>
          <div className={`${styles.disabled}`}>
            <Icon name="trash" />
          </div>
          <div className={`${styles.action} ${styles.btnPrimary}`} onClick={() => { BUURTMAP.getSceneProducts() }}>
            <Icon name="save" />
          </div>
        </>
      }
    </div>
  )
}