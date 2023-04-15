import styles from './styles.module.css'
import { BuurtMap } from '@/utils/BuurtMap';

interface EditorProps {
  disabled: boolean,
  activeProductID: number | null,
  BUURTMAP: BuurtMap
}

export const Editor = ({ disabled, activeProductID, BUURTMAP }: EditorProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.action} onClick={() => { BUURTMAP.removeProductById(activeProductID) }}>delete</div>
    </div>
  )
}