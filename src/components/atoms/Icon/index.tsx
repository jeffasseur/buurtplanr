import clsx from 'clsx'
import React from 'react'

import styles from './styles.module.css'

const icons = [
  'chevron-down',
  'arrow-down',
  'map-pin',
  'search',
  'move',
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
  'furniture',
  'ground',
  'light',
  'tree',
  'water'
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
