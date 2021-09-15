import React, { useState, useEffect } from 'react'

function LeagueNavbar(props) {

  return (
    <nav>
      <button onClick={() => props.setPage('champions')}> Champions </button>
      <button onClick={() => props.setPage('items')}> items </button>
      <input type='text' placeholder="Search Summoner's name" onChange={(e) => props.setUser(e.target.value)}></input>
      <button
        onClick= {() => {if (props.user !== '') props.setPage('user')}}
      >Search</button>
    </nav>
  )

}

export default LeagueNavbar;
