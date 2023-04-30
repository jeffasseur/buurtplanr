import { BuurtMap } from '@/utils/BuurtMap';
import styles from './styles.module.css';

interface setupProps {
  BUURTMAP: BuurtMap
}

export const MapSetup = ({ BUURTMAP }: setupProps) => {
  return (
    <div className={styles.setupContainer}>
      <div>
        <div onClick={BUURTMAP.placeBnds()} className={styles.btnPrimary}>place marker</div>
      </div>
    </div>
  )
}