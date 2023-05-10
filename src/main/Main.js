import React from 'react'
import MainSearch from './MainSearch'
import MainLists from './MainLists'
import NavBar from '../navBar/Navbar'
import { SearchContextProvider } from '../contexts/SearchContext'

function Main() {

  return (
    <div>
      <NavBar />
      <SearchContextProvider>
        <MainSearch />
        <MainLists />
      </SearchContextProvider>
    </div>
  )
}

export default Main