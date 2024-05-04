import React from 'react'
import HeroSection from '../../HeroSection'
import { homeObjOne, homeObjThree, homeObjFour } from './Data'

function Home() {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjFour} />
    </>
  )
}

export default Home
