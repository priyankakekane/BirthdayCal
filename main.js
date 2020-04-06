
//On body Load function
function getinitialCalender() {
    getYearValue();
}

function getYearValue() {

    var field = document.getElementById("json-input");
    var birthdayNameArr = null;
    try {
        birthdayNameArr = JSON.parse(field.value);
    }
    catch (error) {
        if (error instanceof SyntaxError) {
            alert("There was a syntax error. Please correct it and try again: " + error.message);
        }
        else {
            throw error;
        }
    }


    function sortFunction(a, b) {
        var dateA = new Date(a.birthday).getTime();
        var dateB = new Date(b.birthday).getTime();
        return dateA < dateB ? 1 : -1;
    };


    //Sorting the array in order to get youngest one first
    birthdayNameArr.sort(sortFunction);


    //for loop to get day for specific selected year

    for (p in birthdayNameArr) {
        var newYear = document.getElementById("ultra").value;
        var yearToReplace = new Date(birthdayNameArr[p].birthday);
        var yearToReplace1 = yearToReplace.getFullYear();
        birthdayNameArr[p].birthday = (birthdayNameArr[p].birthday).replace(yearToReplace1, newYear);
    }


    //Calculating and mapping dates to days
    var weekdays = new Array(7);
    weekdays[0] = "SUN";
    weekdays[1] = "MON";
    weekdays[2] = "TUES";
    weekdays[3] = "WED";
    weekdays[4] = "THURS";
    weekdays[5] = "FRI";
    weekdays[6] = "SAT";
    var daysOfTheWeek = new Object();
    daysOfTheWeek["SUN"] = new Array();
    daysOfTheWeek["MON"] = new Array();
    daysOfTheWeek["TUES"] = new Array();
    daysOfTheWeek["WED"] = new Array();
    daysOfTheWeek["THURS"] = new Array();
    daysOfTheWeek["FRI"] = new Array();
    daysOfTheWeek["SAT"] = new Array();
    for (var i in daysOfTheWeek) {
        for (j in birthdayNameArr) {
            if (weekdays[new Date(birthdayNameArr[j].birthday).getDay()] == i) {
                daysOfTheWeek[i].push(birthdayNameArr[j].name);
            }
        }
    }

    //variable used to set inner html
    var finalStr = "";


    //function to get initials of Person
    function nameSummary(name) {
        var returnName = "";
        var splittedName = name.split(" ");
        for (nm in splittedName) {
            returnName += splittedName[nm][0];
        }
        return returnName;
    }


    function calculateDynamicDiv(length) {
        var n =  Math.ceil(Math.sqrt(length));
        console.log(n);
        return n;
    }
   
   

    for (let p in daysOfTheWeek) {
        //console.log(daysOfTheWeek[p].length);
        var noOfDivs = calculateDynamicDiv(daysOfTheWeek[p].length);
        finalStr += "<div class='weekday'>";
        finalStr += "<div class='weekdayTitle'>"
        finalStr += p + "</div>";
        if (daysOfTheWeek[p].length == 0) {
            finalStr += "<div class='day--empty'>";
            finalStr += "<span style='font-size:50px;'>&#128577;</span>";
            finalStr += "</div>";

        }
        else if (daysOfTheWeek[p].length == 1) {
            finalStr += "<div>";
            finalStr += "<div class='day--single'>";
            finalStr += nameSummary(daysOfTheWeek[p][0]);
            finalStr += "</div>";


        } else {
            finalStr += "<div class='weekdayView'>";
            for (names in daysOfTheWeek[p]) {
                finalStr += "<div class='inlineDisplay' style=width:calc(100%/"+noOfDivs+");height:calc(100%/"+noOfDivs+")><p>";
                finalStr += nameSummary(daysOfTheWeek[p][names]);
                finalStr += "</p></div>";
            }
        }
        finalStr += "</div>";
        finalStr += "</div>";
    }

    document.getElementById("calContainer").innerHTML = finalStr;


}
