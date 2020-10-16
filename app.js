$(document).ready(function() {

    // using moment to get todays date and current hour  
    const todaysDate = moment().format('MMMM Do YYYY');
    let currentTime24 = moment().format('H');
    let currentTime12 = moment().format('h');

    console.log(currentTime24);
    console.log(currentTime12);

    // setting currentDate to the todays date 
    let titleDate = $('#currentDate');
    titleDate.text(todaysDate);

    // font awesome icon https://fontawsome.com/lincese
    const saveIcon = './images/save-regular.svg';

    // retreive the stored events wit JSON
    let storedEvents = JSON.parse(localStorage.getItem('storedEvents'));

    if (storedEvents !== null) {
        plnTxtArr = storedEvents;
    } else {
        //placeholder to show the user where to type 
        plnTxtArr = new Array(12);
        plnTxtArr[4] = 'Event entry location example';
    }

    //creating the variable linked to the planner element
    let plnCon = $('#plannerContainer');
    plnCon.empty();

    //loop used to determine the number of rows show
    for (let hour = 07; hour <= 19; hour++) {
        let index = hour;

        //create rows for event input lines
        let plnRow = $('<div>');
        plnRow.addClass('row');
        plnRow.addClass('plannerRow');
        plnRow.attr('hour-index',hour);

        //time of day column creator
        let timeCol = $('<div>');
        timeCol.addClass('col-md-2');
        const timeBoxSpan = $('<span>');
        timeBoxSpan.attr('class','timeBox');

        //setting time display
        let displayHour = hour
        let tODDesig = ':00';

        //populate timeBox 
        timeBoxSpan.text(`${displayHour}${tODDesig}`);
        plnRow.append(timeCol);
        timeCol.append(timeBoxSpan);

        //input portion 
        let eventInput = $('<input>');

        eventInput.attr('id',`input-${index}`);
        eventInput.attr('hour-index',index);
        eventInput.attr('type','text');
        eventInput.attr('class','dailyPlan');

        // access index from data array for hour 
        eventInput.val( plnTxtArr[index] );

        //setting column width and setting col === input
        let inputCol = $('<div>');
        inputCol.addClass('col-md-9');
        plnRow.append(inputCol);
        inputCol.append(eventInput);
        
        // creating save button col
        let saveCol = $('<div>');
        saveCol.addClass('col-md-1');
        let saveBtn = $('<i>');
        saveBtn.attr('id',`saveid-${index}`);
        saveBtn.attr('save-id',index);
        saveBtn.attr('class','far fa-save saveIcon');
        plnRow.append(saveCol);
        saveCol.append(saveBtn);

        changeRowColor(plnRow, hour);

        plnCon.append(plnRow);
    };

    // function to update row color
    function changeRowColor (hourRow,hour) { 
        if ( hour < currentTime24) {
            hourRow.css('background-color','tomato')
        } else if ( hour > currentTime24) {
            hourRow.css('background-color','lightgreen')
        } else { 
            hourRow.css('background-color','yellow')
        }
    };

    // local storage save 
    $(document).on('click','i', function(event) {
        event.preventDefault();  

        let saveIndex = $(this).attr('save-id');
    
        let inputId = '#input-'+saveIndex;
        let saveValue = $(inputId).val();
    
        plnTxtArr[saveIndex] = saveValue;
   
        // remove shawdow pulse class
        $(`#saveid-${saveIndex}`).removeClass('shadowPulse');
        localStorage.setItem("storedEvents", JSON.stringify(plnTxtArr));
    });  

    // function to color save button on change of input
    $(document).on('change','input', function(event) {
        event.preventDefault();  
    
        // need to check for save button
        let i = $(this).attr('hour-index');
    
        // add shawdow pulse class
        $(`#saveid-${i}`).addClass('shadowPulse');
    });
}); 