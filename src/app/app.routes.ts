import { Route } from '@angular/router';
import { AppFormComponent } from './appForm/appForm.component';
import { MoviesComponent } from './movies/movies.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { ResetPasswordComponent } from './passwordReset/passwordReset.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: WelcomePageComponent,
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
    },
    {
        path: 'resetPwd',
        component: ResetPasswordComponent,
    },
    {
        path: 'movies',
        component: MoviesComponent,
        canActivate: [AngularFireAuthGuard]
    }
];
