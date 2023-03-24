import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import firebase from 'firebase/compat/app';
import { tap } from "rxjs";
import { MoviesService } from "../movies/movies.service";
import { Store } from "@ngrx/store";
import { userLogged } from "../state/user.action";
import { AuthService } from "../welcome-page/auth.service";
import { apiService } from "src/api.service";


@Component({
  standalone: true,
  selector: 'tp-movies-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet]
})
export class WelcomePageComponent implements OnInit {

  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  resetPassword: boolean;
  getAllDatas$ = this.apiService.getMovies();
  randomImage: string;
  randomName: string;
  getStartedIsClicked: boolean;
  registerIsClicked: boolean;
  emailSent: boolean;
  emailForgotPassword: string;

  constructor (private readonly moviesService: MoviesService, private readonly db: FormBuilder, public authent: AngularFireAuth, private router: Router, private store: Store, public AuthService: AuthService, public apiService: apiService ) {
    this.randomImage = '';
    this.randomName = '';
    this.getStartedIsClicked = false;
    this.registerIsClicked = false;
    this.resetPassword = false;
    this.emailSent = false;
    this.emailForgotPassword = this.forgotPwdForm.value.emailForgotPassword ?? ""

    this.loginEmail = this.loginForm.value.loginEmail ?? '';
    this.loginPassword = this.loginForm.value.loginPassword ?? '';

    this.registerEmail = this.registerForm.value.registerEmail ?? '';
    this.registerPassword = this.registerForm.value.registerPassword ?? '';
  }

  forgotPwdForm = this.db.group({
    emailForgotPassword: ['', Validators.required]
  })

  registerForm = this.db.group({
    registerEmail: ['', Validators.required],
    registerPassword: ['', Validators.required]
  })

  loginForm = this.db.group({
    loginEmail: ['', Validators.required],
    loginPassword: ['', Validators.required]
  })

  ngOnInit() {
    this.authent.signOut();
    this.getAllDatas$.pipe(
      tap((allDatas: any) => {
        const randomNumber = Math.floor(Math.random() * allDatas.results.length);
        this.randomImage = allDatas.results[randomNumber].poster_path;
        this.randomName = allDatas.results[randomNumber].original_title;
      }
      )
    ).subscribe();
  }

  SignIn() {
    //this.loginAuthentication.SignIn(this.loginEmail, this.loginPassword);
    this.AuthService.SignIn(this.loginEmail, this.loginPassword);

    this.loginEmail = ''
    this.loginPassword = ''
  }

  login() {
    this.authent.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.authent.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(userLogged({user : {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          isLogged: true,
        }}))
      } else {
        console.log("no user logged")
      }
    })
      this.router.navigateByUrl('movies')
    });
  }

  SignInWithGithub() {
    this.authent.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(() => this.router.navigateByUrl('movies'));
  }

  forgotPasswordSubmit() {
    this.AuthService.ForgotPassword(this.emailForgotPassword);
    this.emailForgotPassword = '';
    this.emailSent = true;
  }

  onSubmitRegister() {
    this.AuthService.SignUp(this.registerEmail, this.registerPassword);
    this.registerEmail = '';
    this.registerPassword = '';
  }
}
