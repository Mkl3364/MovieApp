import { Route } from '@angular/router';
import { AppFormComponent } from './appForm/appForm.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { ResetPasswordComponent } from './passwordReset/passwordReset.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent
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
