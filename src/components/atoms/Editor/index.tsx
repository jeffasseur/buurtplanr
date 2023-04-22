import styles from './styles.module.css'
import { BuurtMap } from '@/utils/BuurtMap';

interface EditorProps {
  activePID: number | null,
  BUURTMAP: BuurtMap
}

export const Editor = ({ activePID, BUURTMAP }: EditorProps) => {
  return (
    <div className={styles.container}>

    {typeof activePID === 'number'
      ? <div className={`${styles.action} ${styles.enabled}`} onClick={() => { BUURTMAP.removeProductById(activePID) }}>delete</div>
      : <div className={`${styles.disabled}`}>delete</div>
    }
    </div>
  )
}