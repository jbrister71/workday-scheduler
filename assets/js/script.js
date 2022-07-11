var currentTime = moment();

var displayCalendar = function() {
    var currentDate = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(currentDate);

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
        getTimeColor(calendarCenter, i+9);

        var calendarRight = $("<div></div>");
        calendarRight.addClass("calendar-right col-1 mb-1 bg-info rounded-right text-light d-flex align-items-center justify-content-center");
        var icon = $("<span></span>");
        icon.addClass("oi oi-document");
        calendarRight.append(icon);

        calendarRow.append(calendarLeft);
        calendarRow.append(calendarCenter);
        calendarRow.append(calendarRight);
        
        calendar = $(".container");
        calendar.append(calendarRow);
    }
}

getTimeColor = function(calendarCenter, rowTime) {
    if(rowTime < currentTime.hour()) {
        calendarCenter.addClass("bg-secondary");
    }
    else if (rowTime > currentTime.hour()) {
        calendarCenter.addClass("bg-success");
    }
    else {
        calendarCenter.addClass("bg-danger");
    }

    calendarCenter.addClass("text-light");
}

displayCalendar();