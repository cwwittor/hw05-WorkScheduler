var arrayOfIds = [[9, "AM"],[10, "AM"],[11, "AM"],[12, "PM"],[1, "PM"],[2, "PM"],[3, "PM"],[4, "PM"],[5, "PM"],[6, "PM"],[7, "PM"],[8, "PM"]];

var timeQ;

var date = moment();

var dayOfWeek = date.format('dddd');
var month = date.format('LL');

var fullDate = dayOfWeek + ", " + month;

$("#currentDay").text(fullDate);

//gets the time of day formatted in TIME then AM/PM
var timeCheck = date.format('LT');
//makes an array with the time as the first value at 0, and the AM/PM as the second value at 1
var splitVal = timeCheck.split(" ");
var splitHours = timeCheck.split(":");

//Gets the hours number of the time
var hoursNumber = splitHours[0];


//checks if the time is in PM
var ifPM = false;
if (splitVal[1] === "PM"){
    var ifPM = true;
}

//for loop that goes through every hour of the day on the planner checking if it is past, present, or future of the current time
for (var i = 0; i < arrayOfIds.length; i++) {

    //in this case it is PM, so all AM values are past
    if (ifPM == true && arrayOfIds[i][1].charAt(0) == "A") {
        document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.remove("future");
        document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.add("past");


    //in this case it is PM, so it has to figure out what values would be equal to current time along with which would be in past and future
    } else if (ifPM == true && arrayOfIds[i][1].charAt(0) == "P") {
        if  (hoursNumber == arrayOfIds[i][0]){
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.remove("future");
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.add("present");
        } else if (hoursNumber == 12)   {
            //keeps it in future tense
        } else if (hoursNumber > arrayOfIds[i][0]){
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.remove("future");
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.add("past");
        } else if (arrayOfIds[i][0] == 12) {
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.remove("future");
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.add("past");
        } else  {
            //keeps in future tense in these situations where array > hoursNumber
        }


    //in this case it is AM, so it has to figure out what values would be equal to current time along with which would be in past and future
    } else if (ifPM == false && arrayOfIds[i].charAt(0) == "A") {
        if  (hoursNumber == arrayOfIds[i][0]){
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.remove("future");
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.add("present");
        }   else if (hoursNumber == 12) {
            //keeps in future tense
        }   else if (hoursNumber > arrayOfIds[i][0]){
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.remove("future");
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.add("past");
        }  if (arrayOfIds[i][0] == 12) {
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.remove("future");
            document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).classList.add("past");
        } else  {
            //keeps in future tense in these situations where array > hoursNumber
        }


    //in this case it is AM, so all PM values are future
    } else if (ifPM == false && arrayOfIds[i].charAt(0) == "P") {
        //keeps it as future tense
    }

}

//Button that saves
$(".saveBtn").on("click", function() {
    var value = $(this).siblings(".description").val();
    var idStoringValue = $(this).siblings(".description")[0].id;
    
    localStorage.setItem(idStoringValue, value);
});

//at the start of using this program this makes sure all values in local storage are shown
for (var i = 0; i < arrayOfIds.length; i++){
    document.getElementById(arrayOfIds[i][0]+arrayOfIds[i][1]).innerHTML = localStorage.getItem(arrayOfIds[i][0]+arrayOfIds[i][1]);
}