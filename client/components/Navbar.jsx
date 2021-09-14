import React from 'react';

function LeagueNavbar(props) {
  return (
    <nav>
      <a href="/champions"> Champions </a>
      <a href="/items"> items </a>
      <a href="/trends"> trends </a>
      <input type='text' placeholder="Search Summoner's name"></input>
      <button onClick={e => {}}>Search</button>
    </nav>
  );
};

export default LeagueNavbar;