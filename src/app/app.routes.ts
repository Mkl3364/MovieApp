import { Route } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { ResetPasswordComponent } from './passwordReset/passwordReset.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: WelcomePageComponent,
    },
    {
        path: 'resetPwd',
        component: ResetPasswordComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'movies',
        component: MoviesComponent,
        canActivate: [AngularFireAuthGuard]
    },
];
