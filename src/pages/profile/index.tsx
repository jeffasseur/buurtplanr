'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Title from '@/components/atoms/Title'
import UserLayout from '@/components/layouts/user-layout'
import ProfileBijdragen from '@/components/organisms/ProfileBijdragen'

import styles from './styles.module.css'

let baseURL: string = 'http://127.0.0.1:3002/'
if (process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK) {
  baseURL = `${process.env.NEXT_PUBLIC_BUURTPLANR_API_LINK?.toString()}`
}

export const fetchUser = async (token: string) => {
  const res = await fetch(`${baseURL}burgers/id`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${baseURL}`,
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()
  if (data.status === 'success') {
    return data.data
  } else {
    window.location.href = '/login'
  }
}

const UserProfile = () => {
  const [user, setUser] = useState({
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    postalCode: '',
    city: '',
    street: '',
    houseNumber: '',
    image: ''
  })
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login'
    } else {
      const cookieBurger = localStorage.getItem('user')
      if (cookieBurger) {
        const cookieBrurgerParsed = JSON.parse(cookieBurger)
        const user = cookieBrurgerParsed
        setUser(user)
      } else {
        window.location.href = '/login'
      }
    }
  }, [])
  return (
    <UserLayout>
      <header className={styles.header}>
        <div>
          <Image src='/img/types/PARK.png' alt='profielfoto' fill className={styles.headerBg} />
        </div>
        <div className={styles.headerWrapper}>
          <Image src={user?.image} alt='profielfoto' width={250} height={250} className={styles.headerImage} />
          <Title as='h1' size='h1' weight='semibold' className={styles.headerTitle}>{user?.firstname} {user?.lastname}</Title>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainHeader}>
          <Title as='h2' size='h2' weight='semibold' className={styles.title}>Bijdragen</Title>
          <div>
            filter
          </div>
        </div>
        <div className={styles.bijdragen}>
          <ProfileBijdragen burgerId={user?._id} />
        </div>
      </main>
    </UserLayout>
  )
}

export default UserProfile
