import Icon from '@components/atoms/Icon'
import InputField from '@components/atoms/Input'

import styles from './styles.module.css'

import type { Icons } from '@components/atoms/Icon'

interface InputProps {
  label: string
  text: string
  icon?: Icons

}

const Input = ({ label, text, icon }: InputProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.input}>
        <InputField placeholder={text} />
        {icon && <Icon name={icon} className={styles.icon} />}
      </div>
    </div>
  )
}

export default Input
