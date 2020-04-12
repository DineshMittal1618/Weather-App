const request=require('request')

const geoCode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGluZXNobWl0dGFsIiwiYSI6ImNrOHBra3lxazBlbG4zZ3Fpd2Jha3F2cXEifQ.vL-CIJet2R5WTL3EiROy2Q&limit=1'
    request({url:url,json:true},(error,response)=>{
        debugger;
        if(error) {
                    callback(error);

                }
                else if(response.body.features===undefined)
                {
                    callback('Unable to find the location');
                }
                // else if(response.body.query.length === 0)
                // {
                //     callback('Unable to find the location');
                // }
                else{
                    console.log( response.body);
                   console.log(response.body.query.length);
                   
                const data={
                    longitude:response.body.features[0].geometry.coordinates[0],
                    latitude:response.body.features[0].geometry.coordinates[1],
                    location:response.body.features[0].place_name
                }
                callback(undefined,data);
    }})
}


module.exports={
    geoCode:geoCode
}