var dateFormat = 'yyyy-mm-dd';
$(document).ready(function () {
    $('#btnLoadCalendar').on('click', function (e) {
        e.preventDefault();
        var dayNoStr = $('#txtDayNo').val().trim();
        var countryCodeStr = $('#txtCountryCode').val().trim();
        var startDate = $('#txtStartDate').val().trim();
        var momentDate = moment(startDate, 'YYYY-MM-DD');

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
        console.log("country code: " + countryCodeStr);
        console.log("days: " + dayNo);
        console.log("old date: ");
        console.log(momentDate.toString());
        buildCalendar(momentDate, dayNo);
    });
});
function buildCalendar(startDate, days) {
    var endDate = startDate.clone().add(days, 'd');
    var monthList = getAllMonths(startDate, endDate);
    console.log('new date');
    console.log(endDate.toString());
    console.log("Month diff: ");
    console.log(monthList);
    var html = '<div class="week"><div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div></div>';
    var currentDate = startDate.clone();
    for (var i = 0; i < monthList.length; i++) {
        var objMonth = monthList[i];

        //month header
        html += '<div class="month">';
        html += '<div class="monthHeader">' + objMonth.monthName + ' ' + objMonth.year + '</div>';

        //padding days back
        var dayOfWeek = currentDate.day();
        html += '<div class="week">';
        for (var j = 0; j < dayOfWeek; j++) {
            html += '<div class="day disabled"></div>';
        }

        var lastWeekDay = currentDate.day();
        while (currentDate.month() == objMonth.monthDay) {
            html += '<div class="day';
            var currentWeekDay = currentDate.day();
            if (currentWeekDay == 6 || currentWeekDay == 7) {
                html += ' weekend';
            }
            if(currentWeekDay==7){
                
            }
            html += '">' + currentDate.date() + '</div>';
            lastWeekDay = currentDate.day();
            currentDate.add(1, 'd');
        }


        //padding days front
        dayOfWeek = lastWeekDay;
        html += '<div class="week">';
        for (var j = 0; j < dayOfWeek; j++) {
            html += '<div class="day disabled"></div>';
        }


        html += '</div>';
    }
    $('#result').html(html);
}
function getAllMonths(dateStart, dateEnd) {
    var monthList = [];

    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
        var year = dateStart.format('YYYY');
        var month = dateStart.format('MMMM');
        monthList.push({year: year, monthName: month, monthDay: dateStart.format('MM')});
        dateStart.add(1, 'month');
    }
    return monthList;
}
