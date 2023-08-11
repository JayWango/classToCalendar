# classToCalendar
A Google Chrome extension that allows you to input information about a class, and then automatically add it into your calendar. 

Issues:
1. Responsiveness of pop-up on other devices (can be solved using rem,em, or % instead of px)
2. Form not refreshing after "schedule" button is submitted
3. Works on web-page, but not working properly as a chrome extension

Fixes:
1. In-progress (IP)
2. In the JS function addEvent(), you can select the form element using the DOM and do form.reset()
3. IP
