// import { Component } from '@angular/core';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';

// @Component({
//   standalone: true,
//   selector: 'tp-movies-notification-push',
//   templateUrl: './notification-push.component.html',
//   styleUrls: ['./notification-push.component.scss'],
// })
// export class NotificationPushComponent {
//   constructor(private messaging: AngularFireMessaging) {}

//   sendNotification() {
//     this.messaging.requestToken.subscribe((token) => {
//       console.log('Token:', token);

//       const payload = {
//         notification: {
//           title: 'Notification push depuis Angular',
//           body: 'Ceci est un exemple de notification push.'
//         },
//         token: token
//       };

//       this.messaging.sendMessage(payload).subscribe(() => {
//         console.log('Notification push envoyée avec succès.');
//       }, (error: any) => {
//         console.error('Erreur lors de l\'envoi de la notification push:', error);
//       });
//     });
//   }
// }


import { Component } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: 'tp-movies-notification-push',
  templateUrl: './notification-push.component.html',
  styleUrls: ['./notification-push.component.scss'],
})
export class NotificationPushComponent {
title = 'af-notification';
  message:any = null;
  constructor() {}
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.apiKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
}