const request = require("request");

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?types=country&access_token=pk.eyJ1IjoicmFkc2V0IiwiYSI6ImNrYWI3bW1lZDBuZXkyeXJ1am5lY2J0aG0ifQ.8Co99G_VCJ44X4__c73YMw';
  
    request({url: url,json : true},(error,response)=>{
      if(error){
        //console.log('unable to connect to API');
        callback('unable to connect to API',undefined);
      }else if(response.body.features.length===0){
        //console.log('no data for given parameters');
        callback('no data for this location',undefined);
      }else{
        // console.log('response = '+response.body.features[0].center[0]);
        callback(undefined,{ 
          latitude: response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          location: response.body.features[0].place_name
        });
      }
    })
  }

  module.exports = geocode;