const https = require('node:https')

module.exports = class Country {
  constructor() {}

  async fetchData(url) {
    // fetch(`https://restcountries.com/v3.1/all`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then(data => data)
    //   .catch(error => console.log(`Something went wrong ${error}`))
    https.get(url, function(response){

        response.on('data', function(data){
            return JSON.parse(data)
        })
    }).on('error', function (error) {
        console.log(`Something went wrong ${error}`)
    })

  }
};
