import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Game(props) {
  const participants = [];
  props.matchDetail.participants.forEach((participant, i) => {
    participants.push(<div key={i}>{participant}</div>)
  });

  const gameDuration = Math.floor(props.matchDetail.gameDuration / 60);
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
      obj.name = trait.name;
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
    if(unit.items.length > 0){
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

  console.log(filteredUnitsInfo)
  console.log(filteredTraits)

  return (
    <div>
      <div className="mainContainer" style={{ backgroundColor: renderBackGroundColor(placement), border: 'solid 1px black' }}>
        <div className="metric">
          <div>{gameDuration} m</div>
          <div>{level} lvl</div>
          <div>{placement}{placement > 3 ? 'th' : placement === 3 ? 'rd' : placement === 2 ? 'nd' : 'st'} place</div>
        </div>

        <div className='tft_championsList'>
          {filteredUnitsInfo.map(unit => (
            <div className='tft_champion'>
              {renderStars(unit.tier)}
              <div className='tft_champion_image'>
                <img src={`/TFT/champions/${unit.character}.png`} alt=''></img>
              </div>
              <div className='tft_champion_items'>
                {unit.items?.map(item => (
                  <img src={`/TFT/champions/${item}.png`} alt=''></img>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="traitsList">

        </div>

        <div className="participants">
          {participants}
        </div>

      </div>

    </div>
  )
};

export default Game;