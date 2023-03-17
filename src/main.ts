import { importProvidersFrom, isDevMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app/app.routes";

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            ServiceWorkerModule.register('ngsw-worker.js', {
                enabled: !isDevMode(),
                registrationStrategy: 'registerWhenStable:30000',
            })
        ),
        importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
        importProvidersFrom(AngularFireAuthModule),
        importProvidersFrom(AngularFirestoreModule),
        importProvidersFrom(AngularFireStorageModule),
        importProvidersFrom(AngularFireMessaging),
        provideHttpClient(),
        provideRouter(appRoutes)
    ],
}).catch((err) => console.error(err));

if (environment.firebase) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppComponent)
    .then(() => {
        if ('serviceWorker' in navigator && environment.firebase) {
            navigator.serviceWorker.register('/ngsw-worker.js');
        }
    })
    .catch(err => console.log(err));
