# classToCalendar
A Google Chrome extension that allows you to input information about a class, and then automatically add it into your calendar. 

**Issues:**
1. Form not refreshing after "schedule" button is submitted
2. Works on web-page, but not working properly as a chrome extension
3. Add in feature that makes an event repeat until end date on certain days of the week
4. Make page automatically authorize with the API so that user doesn't have to click "authorize"
5. Accidentally exposed API key in Github commit

**Fixes:**
1. In the JS function addEvent(), you can select the form element using the DOM and do form.reset()
2.
3.
4.
5. Solution seemed very roundabout, but I created a separate file called "config.js" which just contains a javascript object and exported it. "background.js" imports the object and accesses the API_KEY and CLIENT_ID from there. However, I began to run into a lot of issues with changing the script tag in my HTML file so that its type attribute was "module". Issues related to scope began to appear and I couldn't access certain functions within "background.js", which caused the Google quickstart API buttons to not appear. The roundabout fix was to create "content.js", which manipulates the DOM to create script and button elements and thus avoids any scope issues. 


**Future Improvements:**
1. Responsiveness of pop-up on other devices (can be solved using rem,em, or % instead of px)



Self Note:
Google Self-Authorize button not showing up, quick fix is to just remove the import function from background.js and revert the script tag to not contain module