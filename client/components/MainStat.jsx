import React, { useState, useEffect } from 'react'
import Game from './Game';
import axios from 'axios';
import Loader from 'react-loader-spinner';

function MainStat(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [matchInfos, setMatchInfos] = useState([]);

  useEffect(() => {
    const getMatches = async () => {
      setIsLoading(true);
      try {
        const matchList = await axios.get(`/api/game/TFT/gamelist/${props.user}`);
        const newMatchInfos = matchList.data;
        setMatchInfos(newMatchInfos);
      }
      catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }
    getMatches();
  }, [props.user])


  return (
    <div>
      <div id='refresh'>
        <button>Refresh!</button>
      </div>
      {isLoading ?
        <Loader type="Grid"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
        style={{padding: '100px', textAlign:'center'}}></Loader> :
        <div id='gameList'>{matchInfos.map((data, id) => (<Game key={id} matchDetail={data} />))}</div>}
    </div>
  )
};

export default MainStat;