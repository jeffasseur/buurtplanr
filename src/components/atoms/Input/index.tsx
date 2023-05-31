import { cva, cx, type VariantProps } from 'class-variance-authority'

import styles from './styles.module.css'

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
    DefaultVariants: {
      size: 'medium',
      borderRadius: 'medium'
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
}

const Input: React.FC<InputProps> = ({
  className,
  Size,
  BorderRadius,
  ...props
}) => {
  const classNames = cx([inputStyle({ Size, BorderRadius }), className])
  return (
    <input
      type={props.type}
      className={classNames}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      min={props.min}
    />
  )
}

export default Input
