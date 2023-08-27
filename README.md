# classToCalendar
A Google Chrome extension that allows you to input information about a class, and then automatically add it into your calendar. 

**Issues:**
1. Form not refreshing after "schedule" button is submitted
2. Works on web-page, but not working properly as a chrome extension
3. Add in feature that makes an event repeat until end date on certain days of the week
4. Make page automatically authorize with the API so that user doesn't have to click "authorize"
5. Accidentally exposed API key in Github commit
6. Want to be able to save the text in each field when a user closes the extension

**Fixes:**
1. In the JS function addEvent(), you can select the form element using the DOM and do form.reset()
2. Fixed with Solution #4 by using Google Identity API
3. Currently able to repeat until end date by using the "RRULE options". Now, events can repeat on certain days of the week by checking whether or not a checkbox is checked. There are 5 if-statements to see if a day of the week is checked. If so, we will append the first 2 letters of the day (ex. Monday = "MO") into an empty string. Each day of the week has to be separated by a comma, so after the if-statements, we use the substring() method to remove the last comma in the entire string so that we can correctly format it for the Calendar API. 
4. Ran into issues with using Google API (gapi) because it turns out that with Manifest v3, Google does not allow you to use external javascript files due to their CSP (Content Security Policy). Instead, I had to use the Google Identity API to authenticate users when they press the "schedule" button. All of the necessary information for using the Identity API is found in the manifest file, under "permissions", "oauth2", and "key". 

    Basically, using this function: "chrome.identity.getAuthToken {interactive: true}, function(token)" will return an access token that allows you to make calls to Google APIs. For this project, we only get access to the Calendar API becuase it is the only API listed under our "scopes". 

    Solution #4 basically makes Solution #5 obsolete since all the code related to initializing the Google API was removed. 

5. Solution seemed very roundabout, but I created a separate file called "config.js" which just contains a javascript object and exported it. "background.js" imports the object and accesses the API_KEY and CLIENT_ID from there. However, I began to run into a lot of issues with changing the script tag in my HTML file so that its type attribute was "module". Issues related to scope began to appear and I couldn't access certain functions within "background.js", which caused the Google quickstart API buttons to not appear. The roundabout fix was to create "content.js", which manipulates the DOM to create script and button elements and thus avoids any scope issues. 

6.

**Future Improvements:**
1. Responsiveness of pop-up on other devices (can be solved using rem,em, or % instead of px)
2. Still stuck on bug where using RDATE when creating an event for the calendar API results in the event being one day behind



# Resources

Regarding using Google OAuth 2 to authenticate users for Chrome Extensions:
1. https://stackoverflow.com/questions/65625854/how-to-integrate-gapi-in-chrome-extensions-manifest-v3
2. https://developer.chrome.com/docs/extensions/mv3/tut_oauth/
3. https://medium.com/geekculture/googles-oauth2-authorization-with-chrome-extensions-2d50578fc64f

Checking if a checkbox is checked:
1. https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked

What's the purpose of a background.js file?
1. https://enlight.nyc/projects/build-a-chrome-extension-to-clip-text


**API Docs:**
1. Google Calendar: https://developers.google.com/calendar/api/concepts/events-calendars
2. JS Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
3. Google Storage: https://developer.chrome.com/docs/extensions/reference/storage/#property-local
4. Google Runtime: https://developer.chrome.com/docs/extensions/reference/runtime/#method-connect
