import React from 'react'
import SearchBar from './SearchBar'

function Header() {
  return (
    <header className="header">
      <button id="openSidebar">&#9776;</button>
      <h1>Farmacia Bethesda</h1>
      <SearchBar />
    </header>
  )
}

export default Header
