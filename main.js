/**
 * Global variables
 */


var eventSearchResultArray = [];
var a = [];

$(document).ready(initializeApp);

// variables to pull data from DOM
var yelpSearchObj = {
    access_token: "17TJfP0tFmBX3bHRcvUEDnVkR2VgnziO0jhDrwgPcrEJXjJ0H66V0H5kmMWQwTHX2cZfhynFzE3sjaEzBb-v7chrsyweKxQQIvPbbW5SvMZt01-PWWi7PPo2PEvVWnYx",
    term: "bbq"/*DOM element search item - a string*/,
    latitude: 34.0522, // current number is for LA  /*DOM element search item - a number, can have decimals*/,
    longitude: -118.2437, // current number is for LA   /*DOM element search item - a number, can have decimals*/,
    location: "Los Angeles"/*DOM element search item - a string*/,
    radius: 4000/*DOM element search item in METERS - a number*/,
    categories: "bbq"/*DOM element search item - a string*/,
    price: "1,2,3"/*DOM element search item - strings that will correlate with $, such as 2 will be the same as $$*/,
    open_now: false /*DOM element search item - boolean*/,
    sort_by: "review_count"/*DOM element search item - string of one of the following: best_match, rating, review_count or distance*/,
};
const yelpBusinessResultsArray = [];

/***************************************************************************************************
 * initializing
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application: adds click/hover handlers, eventfulEventRequest();
 */


function initializeApp() {

    // eventfulEventRequest()

    //addHoverHandlers();
    addClickHandlers();
    //eventfulEventRequest(startDate, endDate, category)
}

/*************************************************************************x**************************
 * addHoverHandler
 * @params {undefined}
 * @returns: {undefined}
 * adds events for when DOM element is hovered over
 */

function addHoverHandler() {

}

/***************************************************************************************************
 * addClickHandlers
 * @params {undefined}
 * @returns: {undefined}
 * adds events for when DOM element is clicked
 */

function addClickHandlers() {
    $('#searchButton').click(function(){
        $(".firstPageContainer").addClass('pageHidden');
        //**** katy add this, do not remove ***////
        $(".eventsDropDownCont").removeClass('pageHidden');
        //***** katy edited ends ****////
        $(".secondPageContainer").removeClass('pageHidden');

    });

    //var eventSearch = $('#searchButten').click(eventfulEventRequest(startDate, endDate, category));

    // $("#yelpSearchButton").click(submitYelpButtonClicked);
}

/***************************************************************************************************
 * callYelpData
 * @params {string} input from the User to search through Yelp
 * @returns: {object} data from Yelp
 * Sends request to Yelp API to pull data based off search input from User
 */
var testData = null;
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
            success: this.pullBusinessData,
            error: function (errors) {
                console.log("errors : ", errors);
            }
        };
        $.ajax(yelpAjaxCall);
    }
    pullBusinessData(data) {
        console.log(data);
        testData = data.businesses;
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
//function eventfulEventRequest(startDate, endDate, category){
class eventfullEventRequester {

    constructor() {

    }

    eventfulEventRequest(renderFunc, date, numOfEntries, category){

        var eventSearchResultObject = {};

        $.ajax({
            //url: "https://api.eventful.com/json/events/search?app_key=Zb7jwSS8MQppFwhH&location=los angeles&within=15&date="+  startDate +"00-" + endDate + "00&category=" +  category + "&image_sizes=blackborder250,block100&page_size=10&category=new",
            url: "https://api.eventful.com/json/events/search?app_key=Zb7jwSS8MQppFwhH&location=los angeles&within=15&date=2018042000-2018042000&category=music&image_sizes=blackborder250,block100&page_size=20&category=new",
            dataType: 'jsonp',
            data: {},
            success: function (rawData) {
                for (var event = 0; event < rawData.events.event.length; event++) {
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
                    if (rawData.events.event[event].venue_name !== null) {
                        var venue_name = rawData.events.event[event].venue_name;
                    }
                    if (rawData.events.event[event].description !== null) {
                        var description = rawData.events.event[event].description;
                    }

                    eventSearchResultObject = {
                        title: title,
                        cityName: cityName,
                        imageSmallUrl: imageSmallUrl,
                        imageLargeUrl: imageLargeUrl,
                        venue_address: venue_address,
                        venue_name: venue_name,
                        description: description
                    }

                    eventSearchResultArray.push(eventSearchResultObject);
                }
                console.log(eventSearchResultArray);

                renderFunc(eventSearchResultArray)

            },
            error: function (error) {
                console.log(error)
            },
        });


    }
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

$(window).on('load', function () {
    let controller = new HappeninsController();
    controller.requestEventData();
    // let arrayOfDummyData = [
    //     {
    //         location: '24576 villa tonda',
    //         'eventName': 'Huge Great Party',
    //         'time': "14:30",
    //         'date': "05-04-18",
    //     },
    //     {
    //         location: '24576 villa tonda',
    //         'eventName': 'Huge Great Party',
    //         'time': "14:30",
    //         'date': "05-04-18",
    //     },
    //     {
    //         location: '24576 villa tonda',
    //         'eventName': 'Huge Great Party',
    //         'time': "14:30",
    //         'date': "05-04-18",
    //     },
    //     {
    //         location: '24576 villa tonda',
    //         'eventName': 'Huge Great Party',
    //         'time': "14:30",
    //         'date': "05-04-18",
    //     }];

})


class HappeninsController{
    constructor(){
        this.newEventfulRequest = new eventfullEventRequester(null, null,null);
        this.newEventRenderer = new EventRenderer();

        this.autoCompleteTimeout=null;
        this.arrayOfEventCategories = ['music','comedy','family_fun_kids','festivals','film','food', 'food &amp; Wine','art',
            'holiday','museums','business','nightlife','clubs','outdoors','animals','sales','science','sports','technology',
            'other'];

        this.handleEventHandlers();
    }

    requestEventData(){
        this.newEventfulRequest.eventfulEventRequest(this.renderEventDataOnSuccess.bind(this), null, null, null)
    }

    renderEventDataOnSuccess(dataArray){
        this.newEventRenderer.turnDataIntoDomElements(dataArray);
    }




    handleEventHandlers(){
        $("#inputEventType").on({
            'keyup': this.onKeyUp.bind(this),
            'focusout': this.onFocusOutCloseAutoComplete.bind(this),
            'focus': function () {
                console.log('here')
            }
        })
    }

    onKeyUp(event) {
        if(event.key==='Escape'){
            this.removeAutoCompleteUL();
        }else if(!this.autoCompleteTimeout) {
            this.autoCompleteTimeout = setTimeout(this.autoCompleteCourse.bind(this), 500);
        }else{
            clearTimeout(this.autoCompleteTimeout);
            this.autoCompleteTimeout = setTimeout(this.autoCompleteCourse.bind(this), 500);
        }
    }
    onFocusOutCloseAutoComplete(event){
        if(!this.focusOutTimeout) {
            this.focusOutTimeout = setTimeout(this.removeAutoCompleteUL, 200);
        }else{
            clearTimeout(this.focusOutTimeout);
            this.focusOutTimeout = setTimeout(this.removeAutoCompleteUL, 200);
        }
    }
    autoCompleteCourse() {
        this.removeAutoCompleteUL();

        let categoryInput = $('#inputEventType');
        let lettersSoFar = categoryInput.val().toLowerCase();

        if(lettersSoFar.length===0){

            // this.removeAutoCompleteUL();
            return;
        }

        let autoCompleteUL=$("<ul>",{
            'id':'autoComplete',
        });
        autoCompleteUL.on('click', '#autoCompleteLI', autoComplete.bind(this));

        let allAutoCorrectMatches = [];

        for(let categoryIndex=0; categoryIndex<this.arrayOfEventCategories.length; categoryIndex++){
            let category = this.arrayOfEventCategories[categoryIndex];

            let sliceToCheck = category.toLowerCase().slice(0,lettersSoFar.length);
            if(category.length === lettersSoFar.length){
                this.removeAutoCompleteUL();
                continue;
            }
            if(sliceToCheck === lettersSoFar && lettersSoFar.length>0){
                let autoCompleteLI = $("<li>",{
                    text:category,
                    'id':'autoCompleteLI',
                });
                allAutoCorrectMatches.push(autoCompleteLI);
            }
        }

        if(allAutoCorrectMatches.length>0){
            for(let index in allAutoCorrectMatches){
                autoCompleteUL.append(allAutoCorrectMatches[index]);
            }
            $("#categoryInput").append(autoCompleteUL);
        }

        function autoComplete(event) {
            var clickedObj=event.target;
            categoryInput.val(clickedObj.outerText);
            this.removeAutoCompleteUL();
        }
    }
    removeAutoCompleteUL(event){
        $("#autoComplete").remove();
    }
    autocompleteAllChoices(){

    }
}

class EventRenderer{
    constructor(){
        // this.arrayOfData = arrayOfData;
        this.arrayOfEventCategories = ['music','comedy','family_fun_kids','festivals','film','food', 'food &amp; Wine','art',
            'holiday','museums','business','nightlife','clubs','outdoors','animals','sales','science','sports','technology',
            'other'];

        this.renderDropDownMenu(this.arrayOfEventCategories);
        // this.turnDataIntoDomElements(this.arrayOfData)
    }
//dropDownMenu begin;
    renderDropDownMenu(arrayOfEventCats){
        let dropDownMenuUL=$(".dropDownUL");

        arrayOfEventCats.forEach(function (liName) {
            let thisLI= $("<li>",{
                'class': `dropDownLI dropDown${liName}`,
                text: liName
            });
            dropDownMenuUL.append(thisLI)
        })
    }
//dropDownMenu end;
    turnDataIntoDomElements(arrayOfInfo){
        for(let objectIndex=0; objectIndex<arrayOfInfo.length; objectIndex++){
            let infoObject = arrayOfInfo[objectIndex];

            let domElement = this.parseData(infoObject);
            this.renderOnScreen(domElement);
        }

    }

    parseData(infoToParse, odd){
        let eventContainer = $("<div>",{
            'class':'event col-xs-12 col-md-3',
            on:{
                // 'click': this.handlePopOutAnimation.bind(this),
            },
        });

        if(infoToParse.imageLargeUrl === undefined){
            infoToParse.imageLargeUrl= 'includes/images/testPartyImg.jpeg'
        }

        let pictureEl = $("<img>",{
            'class':'eventImg eventContent col-xs-3 col-md-12',
            src:`${infoToParse.imageLargeUrl}`,
        });
        let nameEl = $("<div>",{
            'class':'eventName eventContent row col-xs-8 col-md-6',
            text: infoToParse.title,
        });
        let dateEl = $("<div>",{
            'class':'eventDate eventContent row  col-xs-8 col-md-6',
            // text: `When: ${infoToParse.time}, ${infoToParse.date}`,
        });
        let locationEl = $("<div>",{
            'class':'eventLoc eventContent row  col-xs-8 col-md-6',
            text: `Where: ${infoToParse.venue_address}`,
        });


        // start extra information
        let extraEl = $("<div>",{
            'class':'eventExtra shrink',
        });

        let extraInfoText = $("<div>",{
            'class':'eventExtraInfo',
            text: `${infoToParse.description}`,

        });
        let addButton = $("<button>", {
            'type':'button',
            'class': 'addEventButton col-xs-offset-4 col-xs-4',
            'text':'add to list',
        });

        //closure to get added data
        (function (that) {
            addButton.on({
                'click':that.handleAddToListButtonClick.bind(this, that, infoToParse),
            })
        })(this);

        extraEl.append(extraInfoText, addButton);

        // let arrayOfElements = [pictureEl, nameEl, dateEl, locationEl];

        // this.bootstrapClassAdder(arrayOfElements);

        return eventContainer.append(pictureEl, nameEl, dateEl, locationEl, extraEl);
    }

    handlePopOutAnimation(eventOfClick){
        let parent = $(eventOfClick.target).closest('.event');
        let extraInfoDiv = parent.find('.eventExtra');

        this.shrinkAnyExpandedDivs(extraInfoDiv);
        this.popOutAnimation(extraInfoDiv);
    }

    shrinkAnyExpandedDivs(divToSkip){
        let expandedDivs=$(".expand");
        for(let divIndex = 0; divIndex < expandedDivs.length; divIndex++){
            if(expandedDivs[divIndex] !== divToSkip[0])
                expandedDivs.removeClass('expand').addClass('shrink')
        }
    }

    popOutAnimation(extraInfoDiv){
        if(extraInfoDiv.hasClass('expand')) {
            extraInfoDiv.removeClass('expand').addClass('shrink');
        }else{
            extraInfoDiv.removeClass('shrink').addClass('expand');
        }
    }

    handleAddToListButtonClick(thisObj, info, event){
        thisObj.handlePopOutAnimation(event);
        // ^^^ keeps expanded list from closing, but need to fix in later edition

        console.log(info)

        //collect data from event clicked

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
    //should have default values if no value entered
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


/***************************************************************************************************
 * createGoogleMap
 * @params {undefined}
 * @returns: {object} searchObject that contains properties that contain an address or coordinates to center map
 * creates a map to display onto page that will contain makers. Markers will be yelp results
 */


class createGoogleMap {
    constructor(searchObj) {
        this.latitude = searchObj.latitude;
        this.longitude = searchObj.longitude;
        this.searchCoordinates = {
            lat : this.latitude,
            lng : this.longitude
        };
        this.searchArray = searchObj.businesses;
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.searchCoordinates,
            zoom: 5
        });
        this.infoWindow = new google.maps.InfoWindow();
        this.service = new google.maps.places.PlacesService(map);
        this.service.nearbySearch({
            location: this.searchCoordinates,
            radius: 800,
            type: ['restaurant']
        }, this.callback);
    }
    callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for(let i = 0; i < results.length; i++) {
                this.createMarker = this.createMarker.bind(this);
                this.createMarker(results[i]);
            }
        }
    }
    createMarker(place) {
        this.placeLocation = place.geometry.location;
        this.marker = new google.maps.Marker({
            map: map,
            position: this.placeLocation
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(/**/);
            infowindow.open(map, this);
        });
        this.provideLocationData(this.searchArray, this.marker);
    }
    provideLocationData(searchArray) {
        searchArray.map(function(item, marker) {
            this.locationDiv = $("<div>").addClass("locationDiv");
            this.locationName = $("<p>").text(item.name).addClass("locationName");
            this.locationImage = $("<img>").attr("src", item.image_url).addClass("locationImage");
            this.locationLocation = $("<p>").text(item.location["display_address"].map( address => "" + address + ", " + address)).addClass("locationLocation");
            this.locationPhoneNumber = $("<p>").text(item.phone).addClass("locationPhoneNumber");
            this.locationPrice = $("<p>").text(item.price).addClass("locationPrice");
            this.locationRating = $("<p>").text(item.rating).addClass("locationRating");
            this.locationReviewCount = $("<p>").text(item.review_count).addClass("locationReviewCount");
            this.locationURL = $("<p>").text(item.url).addClass("locationURL");

            this.locationDiv.append(this.locationName, this.locationImage, this.locationPrice, this.locationRating, this.locationReviewCount, this.locationLocation, this.locationPhoneNumber, this.locationURL);
            marker.append(this.locationDiv);
        })
    }
}



/***************************************************************************************************
 * autoCompleteLocation
 * @params {undefined}
 * @returns: {object}
 *
 */

function activePlaceSearch(){
        // var input = $('#search-city');
        // var autocomplete = new google.maps.places.Autocomplete(input[0]);
        var input = document.getElementById('search-city');
        var autocomplete = new google.maps.places.Autocomplete(input);

}


























