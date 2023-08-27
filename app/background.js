//background.js is a service-worker and can't access the DOM

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "oauth") {
      port.onDisconnect.addListener(function() {
         console.log("popup has been closed");

         
      });
  };
});