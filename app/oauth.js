const addEvent = async (token) => {
    const form = document.getElementById("eventForm");
    const title = document.getElementById("class-name").value;
    const location = document.getElementById("location").value;
    const room = document.getElementById("room").value;
    const date = document.getElementById("start-date").value;
    const start = document.getElementById("st").value;
    const end = document.getElementById("et").value;

    const apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
  
    const startTime = new Date(date + "," + start).toISOString();
    const endTime = new Date(date + "," + end).toISOString();
  
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
      recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 }
        ]
      }
    };
  
    console.log(event);
    
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

window.onload = function() {
    document.querySelector('button').addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        console.log(token);
        addEvent(token);
      });
    });
  };

