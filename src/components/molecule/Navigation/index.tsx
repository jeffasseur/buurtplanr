'use client'

import Link from 'next/link'
// import { useEffect, useState } from 'react'

import Button from '@/components/atoms/Button'
import DropdownNavUser from '@/components/atoms/Dropdown/NavUser'
import ReduxCheck from '@/helpers/ReduxCheck'
// import { useAppSelector } from '@/redux/store'

import Icon from '../../atoms/Icon'

import styles from './styles.module.css'

const Navigation = () => {
  const authReducer = ReduxCheck()
  // const reduxUser: object = useAppSelector((state) => state.authReducer.data)
  // const isAuth: boolean = useAppSelector((state) => state.authReducer.isAuth)
  // const admin: boolean = useAppSelector((state) => state.authReducer.isAdmin)
  // const [user, setUser] = useState<object>({})
  // const [isAuthState, setIsAuthState] = useState<boolean>(false)
  // const [adminState, setAdminState] = useState<boolean>(false)
  // useEffect(() => {
  //   setUser(reduxUser)
  //   setIsAuthState(isAuth)
  //   setAdminState(admin)
  // }, [reduxUser, isAuth, admin])
  return (
    <div className={styles.navigation}>
      <div className={styles['logo-container']}>
        <Link href='/'>
          <Icon name='logo' className={styles.logo} />
        </Link>
      </div>
      <div className={styles.menu}>
        <Link href='/' className={styles.desktop}>
          <Icon name='home' />
        </Link>
        {
          authReducer.isAdmin &&
          (
            <Button as='link' href='/admin' append='security-user' size='small' className={styles.desktopFlex}>
              Admin
            </Button>
          )
        }
        {
          !authReducer.isAuth &&
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
          authReducer.isAuth && <DropdownNavUser user={authReducer.data} />
        }
      </div>
    </div>
  )
}

export default Navigation
