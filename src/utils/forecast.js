const request=require('request');
const geoCode=require('./geocode')
const forecast=(latitude,longitude,callback)=>{
    
    const url='https://api.weatherbit.io/v2.0/current?key=723d8772c4d34264af3a4916c4969563&lat='+latitude+'&lon='+longitude;
    request({url:url,json:true},(error,response)=>{
            if(error){
                callback(error,undefined);
            }else if(response.body.error)
            {
                callback('Unable to Find the parameter',undefined)
            }else{
                callback(undefined,response.body.data[0].weather)
            }
})

}

module.exports={
    forecast:forecast
}