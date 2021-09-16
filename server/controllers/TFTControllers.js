const { match } = require('assert');
const axios = require('axios');
const { response } = require('express');
const { nextTick } = require('process');
require('dotenv').config();

const TFTControllers = {};

TFTControllers.convertUsernameToPuuid = (req, res, next) => {
  axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${req.params.username}?api_key=${process.env.API_KEY_TFT}`)
    .then(data => {
      res.locals.puuid = data.data.puuid;//a string
      next();
    })
    .catch(err => next(err));
};

TFTControllers.getUserGame = (req, res, next) => {
  axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${res.locals.puuid}/ids?count=10&api_key=${process.env.API_KEY_TFT}`)
    .then(data => {
      res.locals.gameList = data.data;//array of objects
      next();
    })
    .catch(err => next(err));
};

TFTControllers.getMatchInfo = (req, res, next) => {
  const promiseArray = [];

  for (let i = 0; i < res.locals.gameList.length; i++) {
    promiseArray.push(axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${res.locals.gameList[i]}?api_key=${process.env.API_KEY_TFT}`));
  };

  axios.all(promiseArray)
    .then(axios.spread((...responses) => {
      const matchDetails = [];
      const participants = [];
      const gameDurations = [];
      const gameDates=[];
      for (let i = 0; i < responses.length; i++) {
        let usableData = responses[i].data.info.participants; //game infos in array
        participants.push(responses[i].data.metadata.participants); //puuids for all players in the game
        gameDates.push(responses[i].data.info.game_datetime)
        //extracting the game info only for the user
        for (let j = 0; j < usableData.length; j++) {
          if (usableData[j].puuid === res.locals.puuid) {
            matchDetails.push(usableData[j]);
            gameDurations.push(usableData[j].time_eliminated);
          };
        };
      };
      res.locals.matchDetails = matchDetails; //array of objects
      res.locals.participants = participants; //array of strings
      res.locals.gameDurations = gameDurations; //array of integers
      res.locals.gameDates = gameDates; //array of integers
      next();
    }))
    .catch(err => next(err));
}

TFTControllers.convertPuuidToUsername = (req,res,next) =>{
  const promiseArray=[];

  for (let i = 0; i < res.locals.participants.length; i++) {
    for(let j = 0; j < res.locals.participants[i].length; j++){
      promiseArray.push(axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${res.locals.participants[i][j]}?api_key=${process.env.API_KEY_TFT}`));
    }
  };

  axios.all(promiseArray)
    .then(axios.spread((...responses) => {
      const participants = [];
      let convertEach =[];
      let j = 0;
      for (let i = 0; i < responses.length; i++) {
        convertEach.push(responses[i].data.name);
        j+=1;
        if(j===8) {
          participants.push(convertEach);
          convertEach=[];
          j=0
        }
      };
      res.locals.participants = participants; //over writing array of converted usernames
      next();
    }))
    .catch(err => next(err));
}

module.exports = TFTControllers;