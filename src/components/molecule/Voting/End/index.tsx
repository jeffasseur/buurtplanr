import Title from '@/components/atoms/Title'

import styles from './styles.module.css'

const VotingEnd = () => {
  return (
    <div className={styles.endWrapper}>
      <Title as='h2' size='h2' weight='semibold' className={styles.title}>Stemmen voltooid!</Title>
    </div>
  )
}

export default VotingEnd
