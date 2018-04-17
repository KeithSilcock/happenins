/**
 * Define all global variables here.
 */

var searchFoodItem;
var foodLatitude;
var foodLongitude;

$(document).ready(initializing);

function initializing() {
    eventfulEventRequest();
    //eventfulEventRequest(startDate, endDate, category)
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
 * @params {string} startDate, endDate, category
 * @returns: {object} object {city_name, description, title, venue_address, image-url-100px, image-url-250px, venue_name,
 * Sends request to eventful API to pull data based off search input from User
 */
//function eventfulEventRequest(startDate, endDate, category){
function eventfulEventRequest(){

    var eventSearchResultArray = [];
    var eventSearchResultObject = {};

    $.ajax({
        //url: "https://api.eventful.com/json/events/search?app_key=Zb7jwSS8MQppFwhH&location=los angeles&within=15&date="+  startDate +"00-" + endDate + "00&category=" +  category + "&image_sizes=blackborder250,block100&page_size=10&category=new",
        url: "https://api.eventful.com/json/events/search?app_key=Zb7jwSS8MQppFwhH&location=los angeles&within=15&date=2018042000-2018042000&category=music&image_sizes=blackborder250,block100&page_size=20&category=new",
        dataType: 'jsonp',
        data: {},
        success: function (rawData) {
            for (var event=0; event<rawData.events.event.length; event++){
                if (rawData.events.event[event].title !== null) {
                    var title = rawData.events.event[event].title;
                }
                if (rawData.events.event[event].city_name !== null) {
                    var cityName = rawData.events.event[event].city_name;
                }
                if (rawData.events.event[event].image !== null) {
                    var imageSmallUrl = 'http:' + rawData.events.event[event].image.block100.url;
                    var imageLargeUrl = 'http:' + rawData.events.event[event].image.blackborder250.url;
                }
                if (rawData.events.event[event].venue_address !== null) {
                    var venue_address = rawData.events.event[event].venue_address;
                }
                if (rawData.events.event[event].venue_name!== null) {
                    var venue_name = rawData.events.event[event].venue_name;
                }
                if (rawData.events.event[event].description !== null) {
                    var description = rawData.events.event[event].description;
                }

                dataObject = {
                    title: title,
                    cityName: cityName,
                    imageSmallUrl: imageSmallUrl,
                    imageLargeUrl: imageLargeUrl,
                    venue_address: venue_address,
                    venue_name: venue_name,
                    description: description
                }

                eventSearchResultArray.push(dataObject);
            }



            console.log(eventSearchResultArray);

            return eventSearchResultArray;

        },
        error: function (error) { console.log(error) },
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

