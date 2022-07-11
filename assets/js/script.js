var displayCalendar = function() {
    var currentTime = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(currentTime);

    createCalendarElements();
}

var createCalendarElements = function() {
    for(var i = 0; i < 9; i++) {
        var calendarRow = $("<div></div>");
        calendarRow.addClass("row");
        var calendarLeft = $("<div></div>");
        if(i < 3){
            calendarLeft.text((i+9) + "AM");
        }
        else if(i === 3) {
            calendarLeft.text("12PM");
        }
        else {
            calendarLeft.text((i-3)+ "PM");
        }
        calendarLeft.addClass("calendar-left col-1 border-top mb-1");

        var calendarCenter = $("<div></div>");
        calendarCenter.addClass("calendar-center col-10 mb-1");
        getTimeColor();

        var calendarRight = $("<div></div>");
        calendarRight.addClass("calendar-right col-1 mb-1 bg-info rounded-right");

        calendarRow.append(calendarLeft);
        calendarRow.append(calendarCenter);
        calendarRow.append(calendarRight);
        
        calendar = $(".container");
        calendar.append(calendarRow);
    }
}

displayCalendar();