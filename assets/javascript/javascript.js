console.log("1");
$(document).ready(function(){
	
	
 

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmTbVKMzub65gvpS4Ro4BOUT9uiKAaMz4",
    authDomain: "train-time-14e71.firebaseapp.com",
    databaseURL: "https://train-time-14e71.firebaseio.com",
    storageBucket: "train-time-14e71.appspot.com",
    messagingSenderId: "779316321688"
  };
  firebase.initializeApp(config);


var database = firebase.database();





var trainRef = database.ref("/trainData");


// Initial Values
var name = "";
var destination = "";
var time = '00:00';
var frequency = 00;



// submit button adding train 

$("#add-train-btn").on("click", function(event) {
  //event.preventDefault();

  //input values
  var trnName = $("#train-name-input").val().trim();
  var trnDestination = $("#destination-input").val().trim();
  var trnTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
  var trnFrequency = parseInt($("#frequency-input").val().trim());

  // Creates local "temporary" object for holding train data
  var newTrn = {
    name: trnName,
    destination: trnDestination,
    time: trnTime,
    frequency: trnFrequency
  };

  console.log(newTrn);

// Save the new train to the database
    database.ref().push(newTrn);

 
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.time);
  console.log(newTrn.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
 //return false;

}); 



// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // storing into a variable.
  var trnName = childSnapshot.val().name;
  var trnDestination = childSnapshot.val().destination;
  var trnTime = childSnapshot.val().time;
  var trnFrequency = childSnapshot.val().frequency;


//Train info
  console.log(trnName);
  console.log(trnDestination);
  console.log(trnTime);
  console.log(trnFrequency);

  
    var trnTimeConverted = moment(trnTime, "HH:mm").subtract(1, "years");
    console.log(trnTimeConverted);

  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trnTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trnRemainder = diffTime % trnFrequency;
    console.log(trnRemainder);

    // Minute Until Train
    var trnMinutesTill = trnFrequency - trnRemainder;
    console.log("MINUTES TILL TRAIN: " + trnMinutesTill);

    // Next Train
    var nextTrain = moment().add(trnMinutesTill, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" +
  trnFrequency + "</td><td>" + nextTrain+ "</td><td>" + trnMinutesTill + "</td><td>");
});

  
  
});
