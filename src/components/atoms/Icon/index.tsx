import clsx from 'clsx'

import styles from './stlyes.module.css'

const icons = [
    'chevron-down'
] as const

export type Icons = typeof icons[number]

interface IconProps {
    name: Icons
    className?: string
}

const Icon = ({name, className = ''}: IconProps) => {
    const classNames = clsx(styles.icon, className)
    return (
        <svg className={classNames}>
            <use href={`img/icons.svg#${name}`} />
        </svg>
    )

}

export default Icon
