const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event; // Store the triggered events
  butInstall.classList.toggle('hidden', false); // Remove the hidden class from the button.
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt(); // Show prompt
  window.deferredPrompt = null; // Reset the deferred prompt variable, it can only be used once.
  butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null; // Clear prompt
});
