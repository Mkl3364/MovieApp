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
import { provideState, provideStore } from "@ngrx/store";
// import { featureKey, likesReducer } from "./app/state/like.reducer";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { featureUserKey, userReducer } from "./app/state/user.reducer";

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
      provideStore(),
    //   provideState(featureKey, likesReducer),
      provideState(featureUserKey, userReducer),
      provideStoreDevtools(),
      provideRouter(appRoutes),
  ],
}).catch((err) => console.error(err));