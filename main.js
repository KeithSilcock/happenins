/**
 * Global variables
 */

// variables to pull data from DOM
var yelpSearchObj = {
    access_token: "17TJfP0tFmBX3bHRcvUEDnVkR2VgnziO0jhDrwgPcrEJXjJ0H66V0H5kmMWQwTHX2cZfhynFzE3sjaEzBb-v7chrsyweKxQQIvPbbW5SvMZt01-PWWi7PPo2PEvVWnYx",
    term: /*DOM element search item - a string*/,
    latitude: 34.0522 // current number is for LA  /*DOM element search item - a number, can have decimals*/,
    longitude: -118.2437// current number is for LA   /*DOM element search item - a number, can have decimals*/,
    location: /*DOM element search item - a string*/,
    radius: /*DOM element search item in METERS - a number*/,
    categories: /*DOM element search item - a string*/,
    price: /*DOM element search item - strings that will correlate with $, such as 2 will be the same as $$*/,
    open_now: /*DOM element search item - boolean*/,
    sort_by: /*DOM element search item - string of one of the following: best_match, rating, review_count or distance*/,
};
const yelpBusinessResultsArray = [];


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
        this.searchObject = searchObj;
        this.pullBusinessData = this.pullBusinessData.bind(this);
        this.ajaxCall();
    }
    ajaxCall() {
        var yelpAjaxCall = {
            dataType: "JSON",
            method: 'POST',
            url: "http://yelp.ongandy.com/businesses",
            data: this.searchObject,
            //     {
            //     "access_token": "17TJfP0tFmBX3bHRcvUEDnVkR2VgnziO0jhDrwgPcrEJXjJ0H66V0H5kmMWQwTHX2cZfhynFzE3sjaEzBb-v7chrsyweKxQQIvPbbW5SvMZt01-PWWi7PPo2PEvVWnYx",
            //     "term" :"bbq",
            //     "latitude": 34.0522/*DOM element search item*/,
            //     "longitude": -118.2437/*DOM element search item*/
            // },
            success: this.pullBusinessData,
            error: function (errors) {
                console.log("errors : ", errors);
            }
        };
        $.ajax(yelpAjaxCall);
    }
    pullBusinessData(data) {
        debugger;
        console.log(data);
        yelpBusinessResultsArray.length = 0;
        data.businesses.map( item => yelpBusinessResultsArray.push( item ) );
        console.log(yelpBusinessResultsArray);
        var {latitude, longitude} = data.region.center;
        console.log(latitude, longitude);
    }
}

var newYelpCall = new yelpData(yelpSearchObj);

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


// $.ajax(yelpAjaxCall);



/***************************************************************************************************
 * callEventData
 * @para`ms {string} input from the User to search through PredictHQ
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

$(window).on('load', function () {

    let dummyData = {
        location: '24576 villa tonda',
        'eventName': 'Huge Great Party',
        'time': "14:30",
        'date': "05-04-18",
    };

    let newEventRenderer = new EventRenderer(dummyData);
})

class EventRenderer{
    constructor(infoToRender){
        this.infoToRender = infoToRender;

        let domElement1 = this.parseData(this.infoToRender);
        this.renderOnScreen(domElement1)

        let domElement2 = this.parseData(this.infoToRender);
        this.renderOnScreen(domElement2)

        let domElement3 = this.parseData(this.infoToRender);
        this.renderOnScreen(domElement3)
    }

    parseData(infoToParse){
        let eventContainer = $("<div>",{
            'class':'event col-xs-12',
        });
        let pictureEl = $("<img>",{
            'class':'eventImg col-xs-3',
            src:"includes/images/testPartyImg.jpeg",
        });
        let nameEl = $("<div>",{
            'class':'eventName row col-xs-8',
            text: infoToParse.eventName,
        });
        let dateEl = $("<div>",{
            'class':'eventDate',
            text: `When: ${infoToParse.time}, ${infoToParse.date}`,
        });
        // let timeEl = $("<div>",{
        //     'class':'eventTime',
        //     text: infoToParse.time,
        // });
        let locationEl = $("<div>",{
            'class':'eventLoc',
            text: `Where: ${infoToParse.location}`,
        });

        // let arrayOfElements = [pictureEl, nameEl, dateEl, locationEl];

        // this.bootstrapClassAdder(arrayOfElements);

        return eventContainer.append(pictureEl, nameEl, dateEl, locationEl);
    }

    bootstrapClassAdder(arrayOfElements){
        arrayOfElements.forEach(function (item) {
            item.addClass('col-xs-3')
        })
    }

    renderOnScreen(domElement){
        $(".eventsContainer").append(domElement);
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




























