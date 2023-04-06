import { Route } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { ResetPasswordComponent } from './passwordReset/passwordReset.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileComponent } from './profile/profile.component';
import { MovieComponent } from './movie/movie.component';
import { SearchComponent } from './search/search.component';
import { PublicComponent } from './publicComponent/public.component';
import { AccountComponent } from './account/account.component';
import { ChangeEmailComponent } from './changeEmail/changeEmail.component';
import { ChangePasswordComponent } from 'src/app/changePassword/changePassword.component';



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
    {
        path: 'movies/:id',
        component: MovieComponent,
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'search/:query',
        component: SearchComponent,
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'public',
        component: PublicComponent,
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'changeEmail',
        component: ChangeEmailComponent,
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'changePassword',
        component: ChangePasswordComponent,
        canActivate: [AngularFireAuthGuard]
    }
]
