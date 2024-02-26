// Getting a reference to the button element with the ID 'buttonInstall'
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the Progressive Web App (PWA)
// Event handler to the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event; // Storing the triggered event for later use
  butInstall.classList.toggle('hidden', false); // Removing the 'hidden' class from the button to make it visible
});

// Click event handler on the 'butInstall' element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) { // If there's no deferred prompt available, exit the function
    return;
  }

  promptEvent.prompt(); // Display the install prompt to the user
  window.deferredPrompt = null; // Resetting the deferred prompt variable to null, indicating it has been used
  butInstall.classList.toggle('hidden', true); // Hiding the install button after the prompt is shown
});

// Event handler for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null; // Clearing the deferred prompt variable after the app is installed
});
