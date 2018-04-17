/**
 * Global variables
 */


var searchFoodItem;
var foodLatitude;
var foodLongitude;

$(document).ready(initializing);

// variables to pull data from DOM
var yelpSearchObj = {
    term: 'bbq',
    latitude: 34.0522/*DOM element search item*/,
    longitude: -118.2437/*DOM element search item*/,
    location: ""/*DOM element search item*/,
    radius: 2/*DOM element search item*/,
    // categories: /*DOM element search item*/,
    // price: /*DOM element search item*/,
    // open_now: /*DOM element search item*/,
    // sort_by: /*DOM element search item*/,
};
const yelpBusinessResultsArray = [];

function initializing() {
    eventfulEventRequest();
    //eventfulEventRequest(startDate, endDate, category)
}

/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application: adds click/hover handlers
 */

function initializeApp() {
    addHoverHandlers();
    addClickHandlers();
}

/***************************************************************************************************
 * addHoverHandler
 * @params {undefined}
 * @returns: {undefined}
 * adds events for when DOM element is hovered over
 */

function addHoverhandler() {
    // $(/*DOM element to be selected*/).hover(/*some function to display data*/)
}

/***************************************************************************************************
 * addClickHandlers
 * @params {undefined}
 * @returns: {undefined}
 * adds events for when DOM element is clicked
 */

function addClickHandlers() {
    // $(#eventSearchButton).click(/*some function*/);
    // $("#yelpSearchButton").click(submitYelpButtonClicked);
}

/***************************************************************************************************
 * callYelpData
 * @params {string} input from the User to search through Yelp
 * @returns: {object} data from Yelp
 * Sends request to Yelp API to pull data based off search input from User
 */

class yelpData {
    constructor(searchObj) {
        var {term, latitude, longitude, location, radius, categories, price, open_now, sort_by} = searchObj;
        this.pullBusinessData = this.pullBusinessData.bind(this);
        this.ajaxCall();
    }
    ajaxCall() {
        var yelpAjaxCall = {
            dataType: "JSON",
            method: 'POST',
            url: "http://yelp.ongandy.com/businesses",
            data: {
                "access_token": "17TJfP0tFmBX3bHRcvUEDnVkR2VgnziO0jhDrwgPcrEJXjJ0H66V0H5kmMWQwTHX2cZfhynFzE3sjaEzBb-v7chrsyweKxQQIvPbbW5SvMZt01-PWWi7PPo2PEvVWnYx",
                "term": this.term,
                "location" : this.location,
                "radius" : this.radius,
                "categories" : this.categories,
                "price" : this.price,
                "open_now" : this.open_now,
                "latitude": this.latitude, // 34.0522,
                "longitude": this.longitude, //  -118.2437,
                'sort_by' : this.sort_by
            },
            success: this.pullBusinessData,
            error: function (errors) {
                console.log("errors : ", errors);
            }
        };
        $.ajax(yelpAjaxCall);
    }
    pullBusinessData(data) {
        yelpBusinessResultsArray.length = 0;
        debugger;
        data.businesses.map( item => yelpBusinessResultsArray.push( item ) );
        console.log(yelpBusinessResultsArray);
        var {latitude, longitude} = data.region.center;
        console.log(latitude, longitude);
    }
}

var newYelpCall = new yelpData("bbq", 10, 'bbq', 34.0522, -118.2437);

console.log(newYelpCall);

// var yelpAjaxCall = {
//     dataType: "JSON",
//     method: 'POST',
//     url: "http://yelp.ongandy.com/businesses",
//     data : {
//         "access_token" : "17TJfP0tFmBX3bHRcvUEDnVkR2VgnziO0jhDrwgPcrEJXjJ0H66V0H5kmMWQwTHX2cZfhynFzE3sjaEzBb-v7chrsyweKxQQIvPbbW5SvMZt01-PWWi7PPo2PEvVWnYx",
//         "term" : "bbq",
//         "latitude" : 34.0522,
//         "longitude" : -118.2437,
//     },
//     success : function(results) {
//         console.log("success : " , results);
//         results.businesses.map( item => yelpBusinessResultsArray.push( item ) );
//         console.log(yelpBusinessResultsArray);
//         var {latitude, longitude} = results.region.center;
//         console.log(latitude, longitude);
//     },
//     error : function(errors) {
//         console.log( "errors : " , errors );
//     }
// };
//
// $.ajax(yelpAjaxCall);



/***************************************************************************************************
 * callEventData
 * @para`ms {string} input from the User to search through PredictHQ
 * @returns: {object} data from PredictHQ
 * Sends request to PredictHQ API to pull data based off search input from User
>>>>>>> bdfd4bfb3304a34041fa6092b04ac50fab2e3818
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

/***************************************************************************************************
 * submitEventButtonClicked
 * @params {undefined}
 * @returns: {undefined}
 * Leads user to eventPage from index upon click and fills in an object with search properties. Must be able to take all search parameters to filter through Event API.
 */

function eventSubmitButtonClicked() {

}


/***************************************************************************************************
 * submitYelpButtonClicked
 * @params {undefined}
 * @returns: {object} object with all of the search parameters from the user.
 * Creates an object from user search input upon click. Must be able to take all search parameters to filter through Yelp APIs.
 */

function submitYelpButtonClicked() {
    var searchObj = {};
    searchObj.term = $(/*#searchTerm*/).val();
    searchObj.latitude = $(/*#latitude*/).val();
    searchObj.longitude = $(/*#longitude*/).val();
    searchObj.location = $(/*#location*/).val();
    searchObj.radius = $(/*#radius*/).val();
    searchObj.categories = $(/*#categories*/).val();
    searchObj.price = $(/*#price*/).val();
    searchObj.open_now = $(/*#open_now*/).val();
    searchObj.sort_by = $(/*#sort_by*/).val();
    return searchObj;
}




























