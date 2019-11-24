const request=require('request');


const geocode=((address,callback)=>{

    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicmlwdW5qYWkyIiwiYSI6ImNrMnl0MnVocTAyNHozbXFqNXk3MmQ3aGQifQ.DE9L_rN6td30nXziyHK7sA&limit=1"
    request({url, json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to network',undefined);
        }else if(response.body.features.length==0){
            callback('Unable to find location. Please try another search.',undefined);
        }else {
            const data={
            location:response.body.features[0].place_name,
            longitude:response.body.features[0].center[0],
            latitude:response.body.features[0].center[1],
            }
            callback(undefined,data)
        }
    })
})

module.exports=geocode;