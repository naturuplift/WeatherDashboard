// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(  function () {

  // Get the current hour and day using Day.js
  var currentHour = dayjs().hour();
  var today = dayjs();

  // $('.day2-date').text(today.format('[Today is] h:mm:ss a')); // TODO comment once done coloring the current hour

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
   // Here save user input to local storage using the id in the containing time-block.
   $('.saveBtn').on('click', function () { // add event listener
    // for the button clicked, get the id of the time-block
    var blockId = $(this).closest('.time-block').attr('id'); // what was clicked!

    // get user input
    var userInput = $(this).siblings('.description').val(); // what was input

    // save input to local storage
    localStorage.setItem(blockId, userInput); // save the input here
  });
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  // Loop through each time block
  for (let hour = 9; hour < 18; hour++) {
    // time block to check
    let blockId = '#hour-' + hour;

    // Extract the hour from the time-block id
    var blockHour = parseInt(hour);
    
    // Compare blockHour with currentHour to determine past, present, or future
    if (blockHour < currentHour) { 
      // block is in the past
      $(blockId).removeClass('present future').addClass('past');

    } else if (blockHour === currentHour) {
      // block is in the present
      $(blockId).removeClass('past future').addClass('present');

    } else {
      // block is in the future
      $(blockId).removeClass('past present').addClass('future');

    }
  }
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  // use each to iterate over all elements with class 'time-block'
  $('.time-block').each(function () {
    // retrieve 'id' for each time block
    var blockId = $(this).attr('id');
    // retrieve items stored in localstirage for each block
    var storedInput = localStorage.getItem(blockId);

    // if there is stem stored in block
    if (storedInput) {
      // then set the value stored in block to textarea
      $(this).find('.description').val(storedInput);
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  // display the day and date in scheduler
  $('.day1-date').text(today.format('[Today is] dddd, MMM D, YYYY'));

});