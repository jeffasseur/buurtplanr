import { cva, cx, type VariantProps } from 'class-variance-authority'
import Link, { type LinkProps } from 'next/link'
import { type Ref, forwardRef } from 'react'

import Icon, { type Icons } from '@/components/atoms/Icon'

import styles from './styles.module.css'

const buttonStyle = cva(styles.button, {
  variants: {
    theme: {
      Primary: styles.themePrimary,
      Secondary: styles.themeSecondary,
      Tertiary: styles.themeTertiary,
      Warning: styles.themeWarning,
      Transparent: styles.themeTransparent
    },
    size: {
      large: styles.sizeLarge,
      medium: styles.sizeMedium,
      small: styles.sizeSmall
    }
  },
  defaultVariants: {
    theme: 'Primary',
    size: 'medium'
  }
})

interface BaseProps extends VariantProps<typeof buttonStyle> {
  append?: Icons
  children: React.ReactNode
  className?: string
  prepend?: Icons
  href?: string
  onClick?: any
}

type ButtonAsButton = BaseProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
  as?: 'button'
}

type ButtonAsLink = BaseProps & Omit<LinkProps, keyof BaseProps> & {
  as: 'link'
}

type ButtonAsExternal = BaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
  as: 'externalLink'
}

type ButtonProps = ButtonAsButton | ButtonAsExternal | ButtonAsLink

/**
 * Polymorphic Button component
 * `as` can be either:
 * * `button`: will render a `<button>` tag
 * * `link`: will render a NextJS `<Link>` component
 * * `externalLink`: will render a `<a>` tag
 */
const Button = forwardRef<unknown, ButtonProps>(
  ({ size, theme, className, prepend, append, href, ...props }, ref) => {
    const classNames = cx([buttonStyle({ size, theme }), className])

    const { as } = props

    if (as === 'link') {
      return (
        <Link
          className={classNames}
          ref={ref as Ref<HTMLAnchorElement>}
          href={href ?? ''}
        >
          {prepend && <Icon name={prepend} />}

          {props.children}

          {append && <Icon name={append} />}
        </Link>
      )
    }

    if (as === 'externalLink') {
      return (
        <a
          className={classNames}
          target='_blank'
          rel='noopener noreferrer'
          ref={ref as Ref<HTMLAnchorElement>}
          href={href ?? ''}
          {...props}
        >
          {prepend && <Icon name={prepend} />}

          {props.children}

          {append && <Icon name={append} />}
        </a>
      )
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classNames}
        {...props}
      >
        {prepend && <Icon name={prepend} />}

        {props.children}

        {append && <Icon name={append} className={styles[`icon-${size ?? ''}`]} />}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
