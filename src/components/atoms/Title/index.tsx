import { cva, cx, type VariantProps } from 'class-variance-authority'

import styles from './styles.module.css'

const titleStyle = cva(styles.title, {
  variants: {
    size: {
      h1: styles['size-h1'],
      h2: styles['size-h2'],
      h3: styles['size-h3'],
      h4: styles['size-h4']
    },
    weight: {
      light: styles['weight-light'],
      regular: styles['weight-regular'],
      medium: styles['weight-medium'],
      semibold: styles['weight-semibold'],
      bold: styles['weight-bold']
    },
    defaultVariant: {
      size: 'h2',
      weight: 'semibold'
    }
  }
})

interface TitleProps extends VariantProps<typeof titleStyle> {
  children: React.ReactNode
}

type TitlePropsWithAsElementProps<C extends React.ElementType> =
  PolymorphicComponentProp<C, TitleProps>

const Title = <C extends React.ElementType = 'h2'>({
  as,
  children,
  size,
  weight,
  className,
  ...props
}: TitlePropsWithAsElementProps<C>) => {
  const classNames = cx([titleStyle({ size, weight }), className])

  const Component = as ?? 'h2'
  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  )
}

export default Title
