import { Component } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'tp-movies-notification-push',
  templateUrl: './notification-push.component.html',
  styleUrls: ['./notification-push.component.scss'],
  imports: [CommonModule],
})
export class NotificationPushComponent {
  title = 'af-notification';
  message: any = null;
  messageTitle: string | undefined;
  messageBody: string | undefined;
  constructor() {
  }
  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }
  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging,
      { vapidKey: environment.firebase.vapidKey }).then(
        (currentToken) => {
          if (currentToken) {
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
      this.message = payload;
    });
  }

  sendNotification() {
    this.messageTitle = '';
    this.messageBody = '';
  }
}