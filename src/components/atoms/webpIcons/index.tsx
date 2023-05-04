import clsx from 'clsx'
import React from 'react'

import styles from './styles.module.css'
import Image from 'next/image'

const webpicons = [
  'donut',
  'marker',
] as const

export type WebpIcons = typeof webpicons[number]

interface IconProps {
  name: WebpIcons
  className?: string
}

const WebpIcon = ({ name, className = '' }: IconProps) => {
  const classNames = clsx(styles.icon, className)
  return (
    <div draggable="false" className={classNames}>
      <Image draggable='false' src={`/img/${name}.webp`} alt={name} fill />
    </div>
  )
}

export default WebpIcon
