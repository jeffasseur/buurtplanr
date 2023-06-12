import { cva, cx, type VariantProps } from 'class-variance-authority'

import Icon from '@components/atoms/Icon'

import styles from './styles.module.css'

import type { Icons } from '@components/atoms/Icon'

const inputStyle = cva(styles.inputBasic, {
  variants: {
    Size: {
      large: styles.sizeLarge,
      medium: styles.sizeMedium,
      small: styles.sizeSmall
    },
    BorderRadius: {
      medium: styles.borderRadiusMedium,
      small: styles.borderRadiusSmall,
      round: styles.borderRadiusRound
    },
    Checkbox: {
      true: styles.checkbox
    },
    DefaultVariants: {
      size: 'medium',
      borderRadius: 'medium',
      Checkbox: false
    }
  }
})

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputStyle> {
  placeholder?: string
  className?: string
  type?: string
  value?: any
  onChange?: any
  min?: string
  name?: string
  id?: string
  error?: boolean
  icon?: Icons
}

const Input: React.FC<InputProps> = ({
  className,
  Size,
  BorderRadius,
  Checkbox,
  error,
  icon,
  ...props
}) => {
  const classNames = cx([inputStyle({ Size, BorderRadius, Checkbox }), className, error ? styles.error : ''])
  return (
    <div className={classNames}>
      <input
        className={styles.input}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        name={props.name}
        id={props.id}
      />
      {icon && <Icon name={icon} className={styles.icon} />}
    </div>
  )
}

export default Input
