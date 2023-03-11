import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'

import styles from '@/assets/styles/pages/Home.module.css'
import { MapWrapper } from '@/components/3d/DashboardMap'
import { ProjectCard } from '@/components/ProjectCard'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <MapWrapper />
    </>
  )
}
