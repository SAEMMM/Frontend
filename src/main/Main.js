import React from 'react'
import MainSearch from './MainSearch'
import MainLists from './MainLists'
import NavBar from '../navBar/Navbar'

function Main() {
  return (
    <div>
      <NavBar />
      <MainSearch />
      <MainLists />
    </div>
  )
}

export default Main