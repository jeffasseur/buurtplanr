'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import Button from '@/components/atoms/Button'
import DropdownNavUser from '@/components/atoms/Dropdown/NavUser'
import { useAppSelector } from '@/redux/store'

import Icon from '../../atoms/Icon'

import styles from './styles.module.css'

const Navigation = () => {
  const reduxUser: object = useAppSelector((state) => state.authReducer.data)
  const isAuth: boolean = useAppSelector((state) => state.authReducer.isAuth)
  const admin: boolean = useAppSelector((state) => state.authReducer.isAdmin)
  const [user, setUser] = useState<object>({})
  const [isAuthState, setIsAuthState] = useState<boolean>(false)
  const [adminState, setAdminState] = useState<boolean>(false)
  useEffect(() => {
    setUser(reduxUser)
    setIsAuthState(isAuth)
    setAdminState(admin)
  }, [reduxUser, isAuth, admin])
  return (
    <div className={styles.navigation}>
      <div>
        <Link href='/'>
          <Icon name='logo' className={styles.logo} />
        </Link>
      </div>
      <div className={styles.menu}>
        <Link href='/' className={styles.desktop}>
          <Icon name='home' />
        </Link>
        {
          adminState &&
          (
            <Button as='link' href='/admin' append='security-user' size='small' className={styles.desktopFlex}>
              Admin
            </Button>
          )
        }
        {
          !isAuthState &&
          (
            <div className={styles.accountBtns}>
              <Button as='link' href='/register' size='small'>
                Registreren
              </Button>
              <Button as='link' href='/login' size='small'>
                Aanmelden
              </Button>
            </div>
          )
        }
        {
          isAuthState &&
          (
            <Link href='/' className={styles.desktop}>
              <Icon name='notification' />
            </Link>
          )
        }
        {
          isAuthState && <DropdownNavUser user={user} />
        }
      </div>
    </div>
  )
}

export default Navigation
