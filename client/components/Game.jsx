import React, { useState, useEffect } from 'react'
import * as images from './TFT/index.js'


function Game(props) {

  const participants = [];
  props.matchDetail.participants.forEach((participant, i) => {
    participants.push(<div key={i}>{participant}</div>)
  });
  const getTime = time => {
    var minutes = Math.floor(time / 60);
    var seconds = Math.round(time - minutes * 60);
    return minutes.toString() + "m " + seconds.toString() + "s"
  }
  const getDate = date => {
    var index = date?.indexOf(',')
    return date?.slice(0, index)
  }
  const gameDuration = getTime(props.matchDetail.gameDuration);
  const gameDate = getDate((new Date(props.matchDetail.gameDate)).toLocaleString());
  const gameDetails = props.matchDetail.matchDetail;
  const level = gameDetails.level;
  const placement = gameDetails.placement;
  const traits = gameDetails.traits; //array of objects
  const units = gameDetails.units; //array of object
  const filteredTraits = [];
  const filteredUnitsInfo = [];

  traits.forEach(trait => {
    const obj = {}
    if (trait.style > 0) {
      obj.name = trait.name.slice(5).toLowerCase();
      obj.tier = trait.tier_current;
      obj.style = trait.style;
      filteredTraits.push(obj);
    }
  })
  //rarity is the cost-1
  //items are items
  //teir is the star
  units.forEach(unit => {
    const obj = {};
    obj.character = unit.character_id;
    
    obj.rarity = unit.rarity + 1;
    if (unit.items.length > 0) {
      obj.items = unit.items;
      
    }
    obj.tier = unit.tier;
    filteredUnitsInfo.push(obj);
  })

  const renderStars = level => {
    switch (level) {
      case 1:
        return (
          <div className="TFTMatch_userMatch_Unit_Level">
            <p>★</p>
          </div>
        )
      case 2:
        return (
          <div className="TFTMatch_userMatch_Unit_Level">
            <p>★★</p>
          </div>
        )
      case 3:
        return (
          <div className="TFTMatch_userMatch_Unit_Level">
            <p>★★★</p>
          </div>
        )
    }
  }

  const renderBackGroundColor = placement => {
    if (placement === 1) {
      return "lightgreen"
    } else if (placement > 4) {
      return "tomato"
    } else {
      return "skyblue"
    }
  }

  return (
    <div>
      <div className="mainContainer" style={{ display:'flex', justifyContent:'space-between',backgroundColor: renderBackGroundColor(placement), border: 'solid 1px black' }}>
        <div className="metric" style={{ display:'flex', padding:'20px', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <div>{gameDate}</div>
          <div>{gameDuration}</div>
          <div>{level} lvl</div>
          <div>{placement}{placement > 3 ? 'th' : placement === 3 ? 'rd' : placement === 2 ? 'nd' : 'st'} place</div>
        </div>
        <div style={{ display:'flex', width:'700px'}} className='tft_championsList'>
          {filteredUnitsInfo.map(unit => (
            <div className='tft_champion'>
              <div style={{ display:'flex', flexDirection:'column',alignItems:'center'}} >
              {renderStars(unit.tier)}
              <img style ={{width:'75px', height:'75px'}} src={images[`${unit.character}`]} alt=''></img>
              </div>
              <div className='tft_champion_items'>
                {unit.items?.map(item => (
                  <img src={''} alt=''></img>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex',alignItems:'center'}} className="traitsList">
          {filteredTraits.map(trait => (
            <div>
              <img src={images[`${trait.name}`]}></img>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', width: '200px', alignItems:'center', justifyContent:'center'}} className="participants">
          <a href={'/'}>{participants}</a>
        </div>

      </div>

    </div>
  )
};

export default Game;