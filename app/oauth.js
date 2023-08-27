chrome.runtime.connect({ name: "oauth" });

const addEvent = async (token) => {
  const form = document.getElementById("eventForm");
  const title = document.getElementById("class-name").value;
  const location = document.getElementById("location").value;
  const room = document.getElementById("room").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  const start = document.getElementById("st").value;
  const end = document.getElementById("et").value;

  const apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

  const startTime = new Date(startDate + "," + start).toISOString();
  const endTime = new Date(startDate + "," + end).toISOString();

  // const dayCheckboxes = document.getElementsByName("day");
  // let daysOfWeek = "";
  // for (let i = 0; i < dayCheckboxes.length; i++) {
  //   if (dayCheckboxes[i].checked) {
      
  //   }
  // };

  //below code is still better because string needs to be formatted specific way to make API call

  const monday = document.getElementById("monday");
  const tuesday = document.getElementById("tuesday");
  const wednesday = document.getElementById("wednesday");
  const thursday = document.getElementById("thursday");
  const friday = document.getElementById("friday");

  let daysOfWeek = "";
  if (monday.checked) {
    daysOfWeek += "MO,";
  }
  if (tuesday.checked) {
    daysOfWeek += "TU,";
  }
  if (wednesday.checked) {
    daysOfWeek += "WE,";
  }
  if (thursday.checked) {
    daysOfWeek += "TH,";
  }
  if (friday.checked) {
    daysOfWeek += "FR,";
  }

  //this substr removes the last comma of the string 
  daysOfWeek = daysOfWeek.substring(0, daysOfWeek.length - 1);

  //This just removes the "-" dashes from the endDate variable
  let endDateRecurr = "";
  endDateRecurr += endDate.substr(0,4);
  endDateRecurr += endDate.substr(5,2);
  endDateRecurr += endDate.substr(8);

  console.log(`End Date Recurr: ${endDateRecurr}`);

  var event = {
    summary: title,
    location: location,
    description: room,
    start: {
      dateTime: startTime,
      timeZone: "America/Los_Angeles"
    },
    end: {
      dateTime: endTime,
      timeZone: "America/Los_Angeles"
    },
    recurrence: [
      //UNTIL goes in the format of YEAR/MONTH/DAY, ex: 20230925 is 9/25/2023, the recurrence end date is exclusive, not inclusive
      //but, the RDATE parameter should make it inclusive
      //`RDATE;VALUE=DATE:${endDateRecurr}`,
      `RRULE:FREQ=WEEKLY;UNTIL=${endDateRecurr};BYDAY=${daysOfWeek}`
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 24 * 60 },
        { method: "popup", minutes: 10 }
      ]
    }
  };
  
  // Make a Fetch API request
  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
  });

  // Handle the response
  if (response.ok) {
      const responseData = await response.json();
      console.log('Event added:', responseData);
  } else {
      console.error('Failed to add event:', response.status, response.statusText);
  }

  //form will clear once schedule button is submitted
  form.reset();
};

//"input" or "change"? test to see which one works or if both work
const inputs = {};

chrome.storage.sync.set({key: "test"}, function() {
  console.log('Value is set to test');
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});


//function executes when extension loads
window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    //google identity API being used here
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(`Auth Token: ${token}`);
      addEvent(token);
    });
  });
};
