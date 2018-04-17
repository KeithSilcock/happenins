/**
 * Define all global variables here.
 */

var searchFoodItem;
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

// $.ajax(yelpAjaxCall);


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
        this.arrayOfEventCategories = ['music','comedy','family_fun_kids','festivals','film','food', 'food &amp; Wine','art',
            'holiday','museums','business','nightlife','clubs','outdoors','animals','sales','science','sports','technology',
            'other'];

        this.renderDropDownMenu(this.arrayOfEventCategories);

        let domElement1 = this.parseData(this.infoToRender);
        this.renderOnScreen(domElement1)

        let domElement2 = this.parseData(this.infoToRender);
        this.renderOnScreen(domElement2)

        let domElement3 = this.parseData(this.infoToRender);
        this.renderOnScreen(domElement3)
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

    parseData(infoToParse){
        let eventContainer = $("<div>",{
            'class':'event col-xs-12',
            on:{
                'click': this.handlePopOutAnimation.bind(this),
            },
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


















