import { CommonModule } from "@angular/common";
import { Component, OnInit, SimpleChanges } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import firebase from 'firebase/compat/app';
import { tap } from "rxjs";
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
  resetPassword: boolean;
  getAllDatas$ = this.apiService.getMovies();
  randomImage: string;
  randomName: string;
  getStartedIsClicked: boolean;
  registerIsClicked: boolean;
  emailSent: boolean;
  emailForgotPassword: string;

  constructor( private readonly db: FormBuilder, public AuthService: AuthService, public authent: AngularFireAuth, private router: Router, private readonly apiService: apiService) {
    this.randomImage = '';
    this.randomName = '';
    this.getStartedIsClicked = false;
    this.registerIsClicked = false;
    this.resetPassword = false;
    this.emailSent = false;
    this.emailForgotPassword = this.forgotPwdForm.value.emailForgotPassword ?? ""
  }

  forgotPwdForm = this.db.group({
    emailForgotPassword: ['', Validators.required]
  })

  registerForm = this.db.group({
    registerEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    registerPassword: ['', Validators.required]
  })

  loginForm = this.db.group({
    loginEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    loginPassword: ['', Validators.required]
  })

  ngOnInit() {
    this.authent.signOut();
    this.getAllDatas$.pipe(
      tap(allDatas => {
        const randomNumber = Math.floor(Math.random() * allDatas.results.length);
        this.randomImage = allDatas.results[randomNumber].poster_path;
        this.randomName = allDatas.results[randomNumber].original_title;
      }
      )
    ).subscribe();
  }

  SignIn() {
    if(this.loginForm.value.loginEmail && this.loginForm.value.loginPassword) {
      this.AuthService.SignIn(this.loginForm.value.loginEmail, this.loginForm.value.loginPassword).then(() => this.router.navigateByUrl('movies'));;
    }
  }

  login() {
    this.authent.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => this.router.navigateByUrl('movies'));
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
    if(this.registerForm.value.registerEmail && this.registerForm.value.registerPassword) {
      this.AuthService.SignUp(this.registerForm.value.registerEmail, this.registerForm.value.registerPassword).then(() => this.router.navigateByUrl('movies'));;
    }
  }
}
