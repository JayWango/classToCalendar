import { gapiLoaded, gisLoaded , handleAuthClick, handleSignoutClick } from './background.js';

// Load the Google API script
const gapiScript = document.createElement('script');
gapiScript.src = 'https://apis.google.com/js/api.js';
gapiScript.async = true;
gapiScript.defer = true;
gapiScript.onload = gapiLoaded; // Call the imported function
document.head.appendChild(gapiScript);

// Load the Google Identity Services script
const gisScript = document.createElement('script');
gisScript.src = 'https://accounts.google.com/gsi/client';
gisScript.async = true;
gisScript.defer = true;
gisScript.onload = gisLoaded; // Call the imported function
document.head.appendChild(gisScript);

// Create the "Authorize" button
const authorizeButton = document.createElement('button');
authorizeButton.id = 'authorize_button';
authorizeButton.textContent = 'Authorize';
authorizeButton.addEventListener('click', handleAuthClick);

// Create the "Sign Out" button
const signoutButton = document.createElement('button');
signoutButton.id = 'signout_button';
signoutButton.textContent = 'Sign Out';
signoutButton.addEventListener('click', handleSignoutClick);

// Append the buttons to the appropriate element in your HTML
const buttonContainer = document.getElementById('button-container'); // Replace with your actual container ID
buttonContainer.appendChild(authorizeButton);
buttonContainer.appendChild(signoutButton);