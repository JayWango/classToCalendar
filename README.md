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
5. Fixed by creating a separate config.js file which contains the API key and Client ID, and exporting/importing those values into background.js. The .gitignore file makes sure that config.js won't be committed on Github


**Future Improvements:**
1. Responsiveness of pop-up on other devices (can be solved using rem,em, or % instead of px)
