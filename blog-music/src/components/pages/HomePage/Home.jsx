import React from 'react'
import HeroSection from '../../HeroSection'
import { homeObjOne } from './Data'
import Blog from '../BlogPage/Blog'

function Home() {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <Blog />
     
    </>
  )
}

export default Home
