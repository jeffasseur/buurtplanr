import styles from './styles.module.css'
import Link from 'next/link'
import Icon from '../../atoms/Icon'
import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'

const adminProjects = () => {
  return (
    <div>
      <div className={styles.header}>
        <Title size="h3">Start een nieuw project</Title>
        <Button as="link" href="/admin/projecten/create" append='save' size="small">Project starten</Button>
      </div>
    </div>
  )
}

export default adminProjects