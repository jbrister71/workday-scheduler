var currentTime = moment();
var savedTasks = [];

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
        calendarLeft.addClass("calendar-left hour col-1 mb-1");

        var hourId = i;
        var calendarCenter = $("<div></div>");
        calendarCenter.addClass("calendar-center col-10 mb-1 hour-" + hourId);
        calendarCenter.attr("hour", hourId);
        var textContainer = $("<p>");
        textContainer.addClass("text-container");
        calendarCenter.append(textContainer);
        getTimeColor(calendarCenter, i+9);

        var calendarRight = $("<div></div>");
        calendarRight.addClass("calendar-right col-1 saveBtn mb-1 d-flex align-items-center justify-content-center");
        var icon = $("<i></i>");
        icon.addClass("oi oi-document");
        calendarRight.append(icon);

        calendarRow.append(calendarLeft);
        calendarRow.append(calendarCenter);
        calendarRow.append(calendarRight);
        
        calendar = $(".container");
        calendar.append(calendarRow);
    }
}

var getTimeColor = function(calendarCenter, rowTime) {
    if(rowTime < currentTime.hour()) {
        calendarCenter.addClass("past");
    }
    else if (rowTime > currentTime.hour()) {
        calendarCenter.addClass("future");
    }
    else {
        calendarCenter.addClass("present");
    }

    calendarCenter.addClass("text-light");
}

$(".container").on("click", ".calendar-center", function() {
    console.log($(this).find("p"));

    var textElement = $(this).find("p");
    var text = $(textElement)
        .text()
        .trim();

    var textInput = $("<textarea>")
        .addClass("text-form")
        .val(text);

    textElement.replaceWith(textInput);
    textInput.trigger("focus");
});

$(".container").on("blur", "textarea", function() {
    var text = $(this)
        .val()
        .trim();

    var textContainer = $("<p>")
        .addClass("text-container justify-contents-center align-items-center")
        .text(text);

    $(this).replaceWith(textContainer);
});

$(".container").on("click", ".calendar-right", function() {
    var calendarCenter = $(this).parent().find(".calendar-center");
    var textContainer = calendarCenter.find("p");

    console.log(calendarCenter.attr("hour"));

    if(textContainer.text()) {
        var taskObj = {
            text: textContainer.text(),
            hour: calendarCenter.attr("hour")
        }

        savedTasks.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
});

var loadTasks = function() {
    savedTasks = JSON.parse(localStorage.getItem("tasks"));

    console.log("here");

    for(var i = 0; i < savedTasks.length; i++) {
        console.log("got here");
        var calString = ".hour-" + savedTasks[i].hour;
        console.log(calString);
        var calendarElement = $(calString);
        calendarElement.text(savedTasks[i].text);
        console.log(calendarElement);
    }
};

displayCalendar();

loadTasks();