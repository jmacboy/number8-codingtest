var dateFormat = 'yyyy-mm-dd';
$(document).ready(function () {
    $('#btnLoadCalendar').on('click', function (e) {
        e.preventDefault();
        var dayNoStr = $('#txtDayNo').val().trim();
        var countryCodeStr = $('#txtCountryCode').val().trim();
        var startDate = $('#txtStartDate').val().trim();
        console.log(startDate);
        var momentDate = moment.utc(startDate + " 00:00:00", 'YYYY-MM-DD');

        //date validation
        if (!momentDate.isValid()) {
            alert('A valid date must be written, valid format is yyyy-mm-dd.');
            return;
        }

        //dayNo validation
        var dayNo = 0;
        try {
            dayNo = parseInt(dayNoStr);
        } catch (err) {
            alert('A valid number of days must be chosen.');
            return;
        }
        if (dayNo <= 0 || isNaN(dayNo)) {
            alert('A valid number of days must be chosen.');
            return;
        }

        //countryCode validation
        if (!countryCodeStr) {
            alert('A valid Country code must be written');
            return;
        }
//        console.log("country code: " + countryCodeStr);
//        console.log("days: " + dayNo);
//        console.log("old date: ");
//        console.log(momentDate.toString());
        buildCalendar(momentDate, dayNo);
    });
});
function buildCalendar(startDate, days) {
    var endDate = startDate.clone().add(days - 1, 'd');
    var monthList = getAllMonths(startDate.clone(), endDate.clone());
//    console.log('new date');
//    console.log(endDate.toString());
//    console.log("Month diff: ");
    console.log(monthList);
    var html = '<div class="week header"><div class="day header">S</div><div class="day header">M</div><div class="day header">T</div><div class="day header">W</div><div class="day header">T</div><div class="day header">F</div><div class="day header">S</div></div>';
    var currentDate = startDate.clone();
    for (var i = 0; i < monthList.length; i++) {
        var objMonth = monthList[i];

        //month header
        html += '<div class="month">';
        html += '<div class="monthHeader">' + objMonth.monthName + ' ' + objMonth.year + '</div>';

        //padding days back
        var dayOfWeek = currentDate.day();
        var weekOpen = 1;
        html += '<div class="week">';

        for (var j = 0; j < dayOfWeek; j++) {
            html += '<div class="day disabled"></div>';
        }

        var lastWeekDay = currentDate.day();
        var currentMonth = parseInt(currentDate.month() + 1);

        while (currentMonth == parseInt(objMonth.monthNumber)) {
            if (currentMonth == parseInt(endDate.month() + 1) && parseInt(currentDate.date()) > parseInt(endDate.date()) && currentDate.year() == endDate.year()) {
                break;
            }
            console.log(currentDate.toString());
            var currentWeekDay = currentDate.day();
            if (currentWeekDay == 0) {
                html += '<div class="week">';
                weekOpen++;
            }

            html += '<div class="day';

            if (currentWeekDay == 6 || currentWeekDay == 0) {
                html += ' weekend';
            }
            if (currentDate.isHoliday()) {
                html += ' holiday';
            }

            html += '">' + currentDate.date() + '</div>';

            if (currentWeekDay == 6) {
                html += '</div>';
                weekOpen--;
            }

            lastWeekDay = currentDate.day();
            currentDate = currentDate.add(1, 'd');
            currentMonth = parseInt(currentDate.month() + 1);
        }


        //padding days front
        dayOfWeek = lastWeekDay;
        for (var j = 0; j < 6 - dayOfWeek; j++) {
            html += '<div class="day disabled"></div>';
        }
        while (weekOpen > 0) {
            html += '</div>';
            weekOpen--;
        }

        //month closure
        html += '</div>';
    }
    $('#result').html(html);
}
function getAllMonths(dateStart, dateEnd) {
    var monthList = [];
    console.log(dateStart.toString());
    console.log(dateEnd.toString());

    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
        var year = dateStart.format('YYYY');
        var month = dateStart.format('MMMM');
        monthList.push({year: year, monthName: month, monthNumber: dateStart.format('MM')});
        dateStart.add(1, 'month');
    }
    return monthList;
}
