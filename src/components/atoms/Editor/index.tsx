import styles from './styles.module.css'
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
          <div className={`${styles.action} ${styles.enabled}`} onClick={() => { BUURTMAP.removeProductById(activePID), setPID(null) }}>delete</div>
          <div className={`${styles.action} ${styles.btnPrimary}`} onClick={() => { setPID(null) }}>apply</div>
        </>
        :
        <>
          <div className={`${styles.disabled}`}>delete</div>
          <div className={`${styles.action} ${styles.btnPrimary}`} onClick={() => { BUURTMAP.getSceneProducts() }}>apply</div>
        </>
      }
    </div>
  )
}