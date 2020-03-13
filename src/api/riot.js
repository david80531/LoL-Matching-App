const key = 'RGAPI-a3af89f9-112c-46f3-bcea-775a66075340';

function capitalize(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase());
}
const summonerBaseUrl = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/`;
const positionsBaseUrl = `https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/`;
const championBaseUrl = `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/`;
const championNameBaseUrl = `https://na1.api.riotgames.com//lol/static-data/v3/champions/`;

function getUserInfoFromApi(name){
    var userId = NaN;
    var userInfo = {
        championLevel: NaN,
        championId: NaN,
        rank: 'na',
        tier:'na',
        championName: 'na',
        winRate: 70
    };
    var url = `${summonerBaseUrl}${name}?api_key=${key}`;
    console.log(`Making request to: ${url}`);
    return fetch(url).then((response) => response.json() )
    .then((data)=>{
       userId = data.id;
       var url = `${positionsBaseUrl}${userId}?api_key=${key}`;
       console.log(`Making request to: ${url}`);
       return fetch(url).then((response) => response.json() )
       .then((data)=>{
           userInfo.tier = data[0].tier;
           userInfo.rank = data[0].rank;
           userInfo.winRate = ((data[0].wins/(data[0].wins + data[0].losses))*100).toFixed(0);
         var url = `${championBaseUrl}${userId}?api_key=${key}`;
         console.log(`Making request to: ${url}`);
         return fetch(url).then((response) => response.json() )
         .then((data)=>{
             userInfo.championId = data[0].championId;
             userInfo.championLevel = data[0].championLevel;
           var url = `${championNameBaseUrl}${userInfo.championId}?champData=tags&api_key=${key}`;
           console.log(`Making request to: ${url}`);
           return fetch(url).then((response) => response.json() )
           .then((data)=>{
               userInfo.championName = data.key;
               return userInfo;
           }).catch((error)=>{
             console.error(error);
           });
         }).catch((error)=>{
           console.error(error);
         });
       }).catch((error)=>{
         console.error(error);
       });

    }).catch((error)=>{
      console.error(error);
    });
}
module.exports = {
    getUserInfoFromApi
};
