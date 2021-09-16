const express = require('express');
const router = express.Router();
const TFTControllers = require('../controllers/TFTControllers');

router.get('/TFT/gamelist/:username',
  TFTControllers.convertUsernameToPuuid,
  TFTControllers.getUserGame,
  TFTControllers.getMatchInfo,
  TFTControllers.convertPuuidToUsername,
  (req, res) => {
    const array = [];
    
    for(let i = 0; i< res.locals.participants.length; i++){
      array.push({
        participants:res.locals.participants[i],
        matchDetail:res.locals.matchDetails[i],
        gameDuration:res.locals.gameDurations[i],
        gameDate: res.locals.gameDates[i]
      });
    }
    return res.status(200).json(array)//sending all of them
  }
)


module.exports = router;