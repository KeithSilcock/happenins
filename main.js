/**
 * Define all global variables here.
 */

var searchFoodItem;
var foodLatitude;
var foodLongitude;

$(document).ready(initializing);

function initializing() {
    eventfulEventRequest();
}

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

var yelpAjaxCall = {
    dataType: "JSON",
    method: 'GET',
    // url: `https://api.yelp.com/v3/businesses/search?term=${searchFoodItem}&latitude=${latitude}&longitude=${longitude}",
    url: "https://api.yelp.com/v3/businesses/search?term=bbq&latitude=34.0522&longitude=-118.2437",
    data : {
        "Authorization" : "Bearer 17TJfP0tFmBX3bHRcvUEDnVkR2VgnziO0jhDrwgPcrEJXjJ0H66V0H5kmMWQwTHX2cZfhynFzE3sjaEzBb-v7chrsyweKxQQIvPbbW5SvMZt01-PWWi7PPo2PEvVWnYx",
    },
    success : function(results) {
        console.log("success : " + results);
    },
    error : function(errors) {
        console.log( "errors : " + errors );
    }
};

$.ajax(yelpAjaxCall);


/***************************************************************************************************
 * callEventData
 * @params {string} input from the User to search through eventful
 * @returns: {object} data from eventful
 * Sends request to eventful API to pull data based off search input from User
 */
//function eventfulEventRequest(city,date){
function eventfulEventRequest(){
    $.ajax({
        url: "https://api.eventful.com/json/events/search?app_key=Zb7jwSS8MQppFwhH&location=los angeles&within=15&date='2018042000-2018042100';&page_size=50&category=new",
        dataType: 'jsonp',
        data: {},
        success: function (data) {console.log(data) },
        error: function (error) {console.log(error) },
    });
}


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

