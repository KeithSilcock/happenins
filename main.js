/**
 * Define all global variables here.
 */

var searchFoodTerm;
var foodLatitude;
var foodLongitude;



/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application: adds click handlers and pulls in data from server
 */


/***************************************************************************************************
 * callYelpData
 * @params {string} input from the User to search through Yelp
 * @returns: {object} data from Yelp
 * Sends request to Yelp API to pull data based off search input from User
 */

class yelpData {
    constructor(term, latitude, longitude) {
        this.searchTerm = term;
        this.latitude = latitude;
        this.longitude = longitude;
        this.yelpAjaxCall = {
            dataType: "JSONP",
            method: 'GET',
            jsonCallBack : this.jsonCallBack(results),
            // url: `https://api.yelp.com/v3/businesses/search?term=${searchFoodTerm}&latitude=${latitude}&longitude=${longitude}",    // for when we can input search terms and google map lat/long
            url: "https://api.yelp.com/v3/businesses/search?term=bbq&latitude=34.0522&longitude=-118.2437",
            data : {
                "Authorization" : "Bearer 17TJfP0tFmBX3bHRcvUEDnVkR2VgnziO0jhDrwgPcrEJXjJ0H66V0H5kmMWQwTHX2cZfhynFzE3sjaEzBb-v7chrsyweKxQQIvPbbW5SvMZt01-PWWi7PPo2PEvVWnYx",
                // "term" : "bbq",
                // "latitude" : 34.0522,
                // "longitude" : -118.2437,
            },
            success : function(results) {
                console.log("success : " , results);
            },
            error : function(errors) {
                console.log( "errors : " , errors );
            }
        }
    }
    jsonCallBack(jsonResults) {
        console.log(jsonResults);
    },

}

var yelpAjaxCall = {
    dataType: "JSONP",
    method: 'GET',
    // url: `https://api.yelp.com/v3/businesses/search?term=${searchFoodTerm}&latitude=${latitude}&longitude=${longitude}",
    url: "https://api.yelp.com/v3/businesses/search?term=bbq&latitude=34.0522&longitude=-118.2437",
    data : {
        "Authorization" : "Bearer 17TJfP0tFmBX3bHRcvUEDnVkR2VgnziO0jhDrwgPcrEJXjJ0H66V0H5kmMWQwTHX2cZfhynFzE3sjaEzBb-v7chrsyweKxQQIvPbbW5SvMZt01-PWWi7PPo2PEvVWnYx",
        // "term" : "bbq",
        // "latitude" : 34.0522,
        // "longitude" : -118.2437,
    },
    success : function(results) {
        console.log("success : " , results);
    },
    error : function(errors) {
        console.log( "errors : " , errors );
    }
};

$.ajax(yelpAjaxCall);


/***************************************************************************************************
 * callEventData
 * @params {string} input from the User to search through PredictHQ
 * @returns: {object} data from PredictHQ
 * Sends request to PredictHQ API to pull data based off search input from User
 */


/***************************************************************************************************
 * callGoogleData
 * @params {string} input from the User to search through Google Maps
 * @returns: {undefined}
 * Sends request to Google API to pull data based off search input from User
 */


/***************************************************************************************************
 * renderInformationOnDOM
 * @params {object} results from ajax calls
 * @returns: {undefined}
 * Takes the information from the ajax calls and displays on to DOM
 */



class eventRenderer{
    constructor(infoToRender){
        this.infoToRender = infoToRender
    }
}


















