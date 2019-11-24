const request=require('request');

const forecast=((latitude,longitude,callback)=>{
    // const latitude=data.latitude;
    // const longitude=data.longitude;
    const url='https://api.darksky.net/forecast/588b20b5c237fc8f4cd57717af06179b/'+latitude+','+longitude+'?units=si'

    request({url, json:true},(error,data)=>{
        if(error){
            callback('Unable to connect to weather app',undefined);
        }else if(data.body.error){
            callback('Unable to find location. Please try another search',undefined);
        }else{
            callback(undefined,data.body.daily.summary+' It is currently '+data.body.currently.temperature+' degrees out. There is a '+data.body.currently.precipProbability+'% of rain.')
        }
    })

})

module.exports=forecast;