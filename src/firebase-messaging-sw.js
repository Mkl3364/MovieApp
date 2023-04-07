importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBRac5_G996c75mm8bsuDel7vbIXmALlt8",
    authDomain: "movieapp-ca36e.firebaseapp.com",
    projectId: "movieapp-ca36e",
    storageBucket: "movieapp-ca36e.appspot.com",
    messagingSenderId: "52365251065",
    appId: "1:52365251065:web:45fe65f4ee4775e3536d28",
    measurementId: "G-1L82ZR9X58",
    vapidKey: 'BLA_TWXul-S6BtN1nRf0N85CL-fr2Go7OWTtL-f7eG-iWCLSHCC_fLsyZHy3ciXyGpC-DO51kIuVjZRwwBNDktM',
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}
const messaging = firebase.messaging();
