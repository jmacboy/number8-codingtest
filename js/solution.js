var dateFormat = 'yyyy-mm-dd';
$(document).ready(function () {
    $('#btnLoadCalendar').on('click', function (e) {
        e.preventDefault();
        var dayNoStr = $('#txtDayNo').val().trim();
        var countryCodeStr = $('#txtCountryCode').val().trim();
        var startDate = $('#txtStartDate').val().trim();
        var momentDate = moment(startDate,'YYYY-MM-DD');
        
        //date validation
        if(!momentDate.isValid()){
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
        if (dayNo == 0 || isNaN(dayNo)) {
            alert('A valid number of days must be chosen.');
            return;
        }
        
        //countryCode validation
        if(!countryCodeStr){
            alert('A valid Country code must be written');
            return;
        }
        console.log(countryCodeStr)
        console.log(dayNo);
        console.log(momentDate);
    });
});
