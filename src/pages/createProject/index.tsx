import { useRouter } from 'next/router'
import { MapWrapper } from "@/components/3d/MapWrapper"
import { useEffect, useState } from 'react'

const Builder = () => {
  return (
    <>
      <MapWrapper mapType="creator" />
    </>
  )
}

export default Builder
