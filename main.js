/**
 * Global variables
 */


var searchFoodItem;
var foodLatitude;
var foodLongitude;
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
    $('#searchButten').click(function(){
        eventfulEventRequest();
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
>>>>>>> bdfd4bfb3304a34041fa6092b04ac50fab2e3818
 */
//function eventfulEventRequest(startDate, endDate, category){
function eventfulEventRequest(){

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

$(window).on('load', function () {

    let arrayOfDummyData = [
        {
            location: '24576 villa tonda',
            'eventName': 'Huge Great Party',
            'time': "14:30",
            'date': "05-04-18",
        },
        {
            location: '24576 villa tonda',
            'eventName': 'Huge Great Party',
            'time': "14:30",
            'date': "05-04-18",
        },
        {
            location: '24576 villa tonda',
            'eventName': 'Huge Great Party',
            'time': "14:30",
            'date': "05-04-18",
        },
        {
            location: '24576 villa tonda',
            'eventName': 'Huge Great Party',
            'time': "14:30",
            'date': "05-04-18",
        }];

    let newEventRenderer = new EventRenderer(arrayOfDummyData);
})

class EventRenderer{
    constructor(arrayOfData){
        this.arrayOfData = arrayOfData;
        this.arrayOfEventCategories = ['music','comedy','family_fun_kids','festivals','film','food', 'food &amp; Wine','art',
            'holiday','museums','business','nightlife','clubs','outdoors','animals','sales','science','sports','technology',
            'other'];

        this.renderDropDownMenu(this.arrayOfEventCategories);
        this.turnDataIntoDomElements(this.arrayOfData)
    }

    renderDropDownMenu(arrayOfEventCats){
        let dropDownMenuUL=$(".dropDownUL");

        arrayOfEventCats.forEach(function (liName) {
            let thisLI= $("<li>",{
                'class': `dropDownLI dropDown${liName}`,
                text: liName
            })
            dropDownMenuUL.append(thisLI)
        })
    }

    turnDataIntoDomElements(arrayOfInfo){
        for(let objectIndex=0; objectIndex<arrayOfInfo.length; objectIndex++){
            let infoObject = arrayOfInfo[objectIndex];

            let domElement = this.parseData(infoObject);
            this.renderOnScreen(domElement);
        }

    }

    parseData(infoToParse, odd){
        let eventContainer = $("<div>",{
            'class':'event col-xs-12 col-md-5',
            on:{
                // 'click': this.handlePopOutAnimation.bind(this),
            },
        });

        let pictureEl = $("<img>",{
            'class':'eventImg eventContent col-xs-3 col-md-6',
            src:"includes/images/testPartyImg.jpeg",
        });
        let nameEl = $("<div>",{
            'class':'eventName eventContent row col-xs-8 col-md-6',
            text: infoToParse.eventName,
        });
        let dateEl = $("<div>",{
            'class':'eventDate eventContent row  col-xs-8 col-md-6',
            text: `When: ${infoToParse.time}, ${infoToParse.date}`,
        });
        // let timeEl = $("<div>",{
        //     'class':'eventTime',
        //     text: infoToParse.time,
        // });
        let locationEl = $("<div>",{
            'class':'eventLoc eventContent row  col-xs-8 col-md-6',
            text: `Where: ${infoToParse.location}`,
        });


        // start extra information
        let extraEl = $("<div>",{
            'class':'eventExtra shrink',
        });

        let extraInfoText = $("<div>",{
            'class':'eventExtraInfo',
            text: "asdfkdjfl asdlkfklsdjfksd sdfjids asdfkdjfl asdlkfklsdjfksd sdfjids asdfkdjfl asdlkfklsdjfksd sdfjids asdfkdjfl asdlkfklsdjfksd sdfjids" +
            "asdfkdjfl asdlkfklsdjfksd sdfjids asdfkdjfl asdlkfklsdjfksd sdfjids asdfkdjfl asdlkfklsdjfksd sdfjids asdfkdjfl asdlkfklsdjfksd sdfjids",

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




























