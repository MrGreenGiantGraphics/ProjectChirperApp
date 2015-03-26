// Master Array
var friends = [];

// Chirps Array
var chirps = [];

// Profile Array
var profile = [];

// Urls for database connection.
var chirpTypeFriendUrl = "https://chirpermessage.firebaseio.com/friends/.json";
var chirpTypeFriendCus = "https://chirpermessage.firebaseio.com/friends/";
var chirpTypeTweetsUrl = "https://chirpermessage.firebaseio.com/tweets/.json";
var chirpTypeTweetsCus = "https://chirpermessage.firebaseio.com/tweets/";
var chirpTypeProfileUrl = "https://greengiantgraphics.firebaseio.com/profile/.json";
var chirpTypeProfileCus = "https://greengiantgraphics.firebaseio.com/profile/";
var xhr = new XMLHttpRequest();

// FRIEND Constructor
function Friend(name, handle, city, url) {
    this.name = name;
    this.handle = handle;
    this.city = city;
    this.url = url;
    this.chirps = [];
};


// Chirps Constructor
function Chirp(chirps, username) {
    this.chirps = chirps;
    this.date = moment();
    this.username = username;
};


// Profile Constructor
function Profile(name, handle, city, url) {
    this.name = name;
    this.handle = handle;
    this.city = city;
    this.url = url;
}

//URL Maker
var urlMaker = function (base) {
    var url = "https://" + base + ".firebaseio.com/"
    for (var i = 1; i < arguments.length; i++) {
        url += arguments[i] + "/"
    }
    return url + ".json";
}

//////////////////////////////////////////////
//        CODE FOR SIDE PROFILE             //
/////////////////////////////////////////////

/*

<!-- Logic for displaying PROFILES line 74 HTML -->

<li id="profile-handle"><a href="#"><i class="glyphicon glyphicon-comment"></i></a></li>
<li id="profile-name"><a href="#"><i class="glyphicon glyphicon-user"></i>&nbsp;User Name</a></li>
<li id="profile-city"><a href="#"><i class="glyphicon glyphicon-home"></i>&nbsp;City</a></li>

*/

var retrieveProfile = function () {

    var request = new XMLHttpRequest();

    request.open('GET', chirpTypeProfileUrl, true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            console.log('GET was successful');
            var name = data.name;
            var handle = data.handle;
            var city = data.city;
            var url = data.url;

            profile = new Profile(name, handle, city, url)

            var profileName = '<a href="#" id="profile-name"><i class="glyphicon glyphicon-comment"></i>&nbsp;&nbsp;' + profile.name + '</a>';
            var profileHandle = '<a href="#" id="profile-handle"><i class="glyphicon glyphicon-user"></i>&nbsp;&nbsp;' + profile.handle + '</a>';
            var profileCity = '<a href="#" id="profile-city"><i class="glyphicon glyphicon-home"></i>&nbsp;&nbsp;' + profile.city + '</a>';

            $('#profile-handle').empty();
            $('#profile-name').empty();
            $('#profile-city').empty();
            $('#profile-handle').append(profileHandle);
            $('#profile-name').append(profileName);
            $('#profile-city').append(profileCity);
        } else {
            console.log("Error" + request.response);
        }        
    }    
}

retrieveProfile();

/*
<!-- Logic for Edit Area on PROFILE Modal line 136 HTML -->

*(editProfile())*

<h3 class="glyphicon">Profile</h3>
<a class="glyphicon glyphicon-pencil" href="#" 
data-toggle="modal" data-target="#myModal" onclick="editProfile()"></a>

<h4 class="modal-title">Edit Profile</h4></div>
<br /><div class="modal-body">
<div class="form-group column col-lg-12">

<label for="handle-input">Handle</label>
<input type="text" class="form-control" id="handle-input" placeholder="Username">
</div><div class="form-group column col-lg-12">

<label for="user-input">Name</label>
<input type="text" class="form-control" id="user-input" placeholder="Enter User Name">
</div><div class="form-group column col-lg-12">

<label for="city-input">City</label>
<input type="text" class="form-control" id="city-input" placeholder="Enter city">
</div>

<p class="text-center">Save changes</p></div><div class="modal-footer">

*(update-profile)*
<button id="update-profile" data-dismiss="modal" 
 type="button" class="btn btn-primary">Update</button>

*/

$("#update-profile").click(function () {
    editProfile();
});

function editProfile() {

    var handle = $("#handle-input").val();
    var user = $("#user-input").val();
    var city = $("#city-input").val();
    var updatedProfile = new Profile(user, handle, city, null);

    var customUrl = chirpTypeProfileCus + ".json"

    var myrequest = new XMLHttpRequest();
    myrequest.open("PUT", customUrl, true);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) { // success
            console.log("PUT was a success", this.response);
            retrieveProfile();
        } else { // problem
            console.log("Houston we have a problem");
        }
    };
    var jsonToSend = JSON.stringify(updatedProfile); // covert to string
    myrequest.send(jsonToSend); // send to firebase
}


//////////////////////////////////////////////
//        CODE FOR Users and Friends       //
/////////////////////////////////////////////


/*
<!-- Logic for displaying FRIENDS line 86 HTML -->

<div class="panel-body">
<div class="list-group">
<div id="view-friends" class="list-group-item ">
<p class="text-center">User</p>
<p class="text-center">Name</p>
<p class="text-center">City</p>
<hr />
<!--Delete Friend-->
<a href="#"><i class="glyphicon glyphicon-trash"></i></a>
<!-- End Delete Friend-->
</div>
</div>
</div>
<!-- End Friends DIV-->
*/

var retrieveFriends = function () {
    var request = new XMLHttpRequest();
    request.open('GET', chirpTypeFriendUrl, true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            console.log('GET was successful');
            friends = [];
            for (var i in data) {
                data[i].id = i;
                friends.push(data[i]);
            }
            displayFriends();
        } else {
            console.log("Error" + request.response);
        }
    }
}


retrieveFriends();

displayFriends = function () {

    $("#view-friends").empty();

    for (var i in friends) {

        var dateObj = friends[i];
        var newFriend = new Friend(dateObj.name, dateObj.handle, dateObj.city, dateObj.url);

        newFriend.__proto__ = { id: i };
        friends.push(newFriend);

        $("#view-friends").append("<h4 class='text-center'><strong>" + dateObj.handle + "</strong></h4>");
        $("#view-friends").append("<p class='text-center'>" + dateObj.name + "</p>");;
        $("#view-friends").append("<p class='text-center'>" + dateObj.city + "</p>");
        $("#view-friends").append("<a href='#'><i class='glyphicon glyphicon-trash' onclick='deleteFriend(" + i + ")'></i></a><hr>")
    }
};

//Remove Friend <p>
function removeFriendRow(index) {
    $("#view-friends" + index).remove();
}


//////////////////////////////////////////////
//   CODE FOR SENDING and DELETING CHIRPS   //
/////////////////////////////////////////////

/*
GET Chirps via AJAX CALL
*/

var retrieveChirps = function () {
    var request = xhr;
    request.open('GET', chirpTypeTweetsUrl, true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            console.log('GET was succesful');
            chirps = [];
            for (var i in data) {
                data[i].id = i;
                chirps.push(data[i]);
            }
            displayChirps();
        } else {
            console.log("Error" + request.response);
        }
    }

}
retrieveChirps();

/*
<!-- Logic for Sending CHIRPS line 74 HTML -->

<form class="form-horizontal" role="form">
<h4>Send Message!</h4>
<div class="form-group" style="padding:14px;">

*(function onKeyPress(e))*
<textarea onkeypress="onKeyPress(event)" id="chirp-input" 
class="form-control" placeholder="Update your status">
</textarea></div>
*(chirp-input)*
*(createChirp())*
<button onclick="createChirp()" class="btn btn-primary pull-right" type="button">
Chirp!</button><ul class="list-inline"><li>

</form>

*/

// Callback Function set to check every 4 seconds

var pollingChirps = function (callback) {
    var timer = setInterval(callback, 4000);
}

function onKeyPress(e) {
    if (typeof e === "undefined" && window.event) {
        e = window.event;
    }
    if (e.keyCode == 13) {
        createTweet();
    }
}

createTweet = function () {
    var chirpValue = $('#chirp-input').val();
    var handle = profile.handle;
    var newChirp = new Chirp(chirpValue, handle);
    console.log(newChirp.date);
    postChirp(newChirp);
    $('#chirp-input').val('');
}

/*
POST Chirps via AJAX CALL
*/

postChirp = function (dataToSend) {
    var request = xhr;
    var url = chirpTypeTweetsUrl
    request.open('POST', url, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log('POST was successful!');
            var id = JSON.parse(this.response);
            dataToSend.id = id;
            chirps.push(dataToSend);
            pollingChirps(retrieveChirps);
        } else {
            console.log('POST was unsuccessful.');
        }
    }

    request.send(JSON.stringify(dataToSend));
};

/*
DELETE Chirps via AJAX CALL
*/

function deleteChirp(itemIndexClicked) {
    var currChirp = chirps[itemIndexClicked];
    currEditId = currChirp.id;

    var customUrl = chirpTypeTweetsCus + currEditId + "/.json";

    var myrequest = xhr;
    myrequest.open("DELETE", customUrl, true);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var firebaseData = JSON.parse(this.response);
            console.log("DELETE was a success", firebaseData);
            removeFriendRow(currEditId);
            retrieveChirps();
        } else {
            console.log("there was a problem");
        }
    };
    myrequest.send();

};


/* READ Chirps

<div class="panel panel-default">
<div class="panel-heading"><h4>Most Recent Chirps</h4>

*(newChirp)*
<a href="#">Chirps<span class="badge" id="newChirps"></span></a>
<!--<button class="btn btn-primary btn-my-chirps" type="button" >My Chirps</button>--></div>

*("#chirp-display")*
<!-- Display Chirps--><div id="chirp-display" class="panel-body">
</div>
<!-- End Display Chirps-->
</div>

*/
displayChirps = function () {

    $("#chirp-display").empty();
    chirps.reverse();
    for (var i in chirps) {

        var tempChirp = chirps[i];
        var tempTime = moment(tempChirp.date).fromNow();
        console.log(tempTime);

        var newChirp = new Chirp(tempChirp.chirps, tempChirp.username);

        newChirp.__proto__ = { id: i };

        chirps.push(newChirp);

        $("#chirp-display").append("<p><strong><h4 class='chirp-h4' ><a href='#' id='chirp-display' data-toggle='modal' data-target='#myModal2' class='panel-body' onclick='retrieveFriendChirps(" + i + ")'>" + tempChirp.username + "</a></h4></strong></p>")
        $("#chirp-display").append("<p><em><h4 class='chirpP'>" + tempChirp.chirps + "</h4></em></p>")
        $("#chirp-display").append("<p><h6>" + tempTime + "</h6><a href='#'><i class='glyphicon glyphicon-trash pull-right' onclick='deleteChirp(" + i + ")'></i></a></p></br><hr>")
    }
}


//////////////////////////////////////////////
//           TEST CODE AREA                //
/////////////////////////////////////////////