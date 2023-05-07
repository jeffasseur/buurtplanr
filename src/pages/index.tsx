import Head from 'next/head'
import Image from 'next/image'

import styles from '@/assets/styles/pages/Home.module.css'
import { MapWrapper } from '@/components/3d/MapWrapper'

export default function Home () {
  return (
    <>
      <MapWrapper mapType='overview' />
    </>
  )
}
