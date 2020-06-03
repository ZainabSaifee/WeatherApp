
const request = require("request");

const forecast= (latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=6747e9e0a6c5cee7f5e3a91f94ba5cca&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
    request({url ,json : true },(error,response)=>{
      if(error){
        callback('unable to connect with API',undefined);
      }else if(response.body.error){
        callback(response.body.error.info,undefined);
      }else{
        const reply = [response.body.current.temperature,response.body.current.feelslike,response.body.current.weather_descriptions[0]]
        callback(undefined,reply);
        // callback(undefined,response.body.current.weather_descriptions[0]);
      }
    });
  
  }

  module.exports = forecast;