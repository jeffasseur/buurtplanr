import clsx from 'clsx'
import React from 'react'

import styles from './styles.module.css'

const icons = [
  'chevron-down',
  'folder',
  'profile-user',
  'setting',
  'trend-up',
  'logo',
  'home',
  'security-user',
  'notification',
  'trash',
  'save',
  'setting-3',
  'eye',
  'arrow-right',
  'adjust',
  'arrow-left'
] as const

export type Icons = typeof icons[number]

interface IconProps {
  name: Icons
  className?: string
}

const Icon = ({ name, className = '' }: IconProps) => {
  const classNames = clsx(styles.icon, className)
  return (
    <svg className={classNames}>
      <use href={`/img/icons.svg#${name}`} />
    </svg>
  )
}

export default Icon
