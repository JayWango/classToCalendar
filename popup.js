const addEvent = () => {
  const form = document.getElementById("eventForm");
  const title = document.getElementById("class-name").value;
  const location = document.getElementById("location").value;
  const room = document.getElementById("room").value;
  const date = document.getElementById("start-date").value;
  const start = document.getElementById("st").value;
  const end = document.getElementById("et").value;

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
  
  //creates request to insert new event into user's calendar
  var request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event
  });

  //executes API request
  request.execute(function(event) {
    console.log(event.htmlLink);
  });

  //form will clear once schedule button is submitted
  form.reset();
};