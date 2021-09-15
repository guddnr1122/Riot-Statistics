import React, { useState, useEffect } from 'react'
import LeagueNavbar from './components/Navbar';
import MainStat from './components/MainStat';
import Champions from './components/Champions';
import Items from './components/Items';
import Home from './components/Home';

function App(props) {
  //pages
  const [page, setPage] = useState('home');
  const [user, setUser] = useState('');

  return (
    <div id='mainApp' >
      <LeagueNavbar setPage={setPage} setUser={setUser} user={user}/>
      {page === 'home' && <Home />}
      {page === 'items' && <Items />}
      {page === 'champions' && <Champions />}
      {page === 'user' && <MainStat />}
    </div>
  )
}

export default App;