import React from 'react'
import Hero from '../components/Hero.jsx'
import About from './About'
import Services from './Services'
import Pricing from './Pricing'
import Contact from './Contact'
import Trainers from './Trainers.jsx'

const Home = () => {
  return (
    <>
    
      <Hero/>
      <About/>
      <Services/>
      <Trainers/>
      <Pricing/>
      <Contact/>
    </>
  )
}

export default Home
