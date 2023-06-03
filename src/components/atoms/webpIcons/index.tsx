import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import styles from './styles.module.css'

interface IconProps {
  name: string
  className?: string
}

const WebpIcon = ({ name, className = '' }: IconProps) => {
  const classNames = clsx(styles.icon, className)
  return (
    <div className={classNames}>
      <Image draggable='false' src={`/img/productThumbnails/${name}.webp`} alt={name} fill />
    </div>
  )
}

export default WebpIcon
