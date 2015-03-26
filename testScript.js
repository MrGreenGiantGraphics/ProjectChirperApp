// This is DELETE FUNCTION do this last!
//Remove Friend <p>
function removeFriendRow(index) {
    $("#friend-render" + index).remove();

    //Delete Friends AJAX CALL//

    function deleteFriend(itemIndexClicked) {
        var currFriend = people[itemIndexClicked];
        currEditId = currFriend.id;

        var customUrl = "https://chirptime.firebaseio.com/friends/" + currEditId + "/.json";

        var myrequest = new XMLHttpRequest();
        myrequest.open("DELETE", customUrl, true);
        myrequest.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                var firebaseData = JSON.parse(this.response);
                console.log("DELETE was a success", firebaseData);
                removeFriendRow(currEditId);
                retrieveFriends();
            } else {
                console.log("there was a problem");
            }
        };
        myrequest.send();

    };


    //Delete Chirps AJAX CALL//
    function deleteChirp(itemIndexClicked) {
        var currChirp = chirps[itemIndexClicked];
        currEditId = currChirp.id;

        var customUrl = "https://chirptime.firebaseio.com/chirps/" + currEditId + "/.json";

        var myrequest = new XMLHttpRequest();
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
}
/**************************************OLD CODE*****************************************/
//// Url links that connect to the directories:
//var chirpTypeFriendUrl = "https://greengiantgraphics.firebaseio.com/friends/.json";
//var chirpTypeProfileUrl = "https://greengiantgraphics.firebaseio.com/profile/.json";
//var chirpTypeTweetsUrl = "https://greengiantgraphics.firebaseio.com/tweets/.json";

//// Url to create the Firebase connection
//ChirpMain.baseUrl = 'https://greengiantgraphics.firebaseio.com/';

////Create the Main object that hold EVERYTHING!
//ChirpMain = {};

//// DataBase - Like in the address application this is where the data is stored.
//ChirpMain.storage = [];



//// Id for items to be edited
//ChirpMainList.editId = '';

//// Variable used to edit the selected Contact
//ChirpMainList.currContact;
//ChirpMainList.currContactId;
//ChirpMainList.editUrl;
//ChirpMainList.saveChanges = function () {
//    var fName = $('#modalFirstName').val();
//    var lName = $('#modalLastName').val();
//    var phone = $('#modalPhone').val();
//    var city = $('#modalCity').val();
//    var email = $('#modalEmail').val();
//    var tempGroup = document.getElementById("modalGroup");
//    var group = tempGroup.options[tempGroup.selectedIndex].text;

//    var tempContact = new ChirpMainList.contact(fName, lName, phone, city, email, group);
//    ChirpMainList.put(tempContact);
//}