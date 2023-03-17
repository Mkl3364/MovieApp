import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import firebase from 'firebase/compat/app';
import { tap } from "rxjs";
import { MoviesService } from "../movies/movies.service";
import { RegisterFormService } from "./register.service";
import { LoginFormService } from "../welcome-page/login.service";

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
  getAllDatas$ = this.moviesService.getMovies();
  randomImage: string;
  randomName: string;
  getStartedIsClicked: boolean;
  registerIsClicked: boolean;

  constructor(private readonly moviesService: MoviesService, private readonly db: FormBuilder, public loginAuthentication: LoginFormService, public authent: AngularFireAuth, private router: Router, public registerService: RegisterFormService) {
    this.randomImage = '';
    this.randomName = '';
    this.getStartedIsClicked = false;
    this.registerIsClicked = false;

    this.loginEmail = this.loginForm.value.loginEmail ?? '';
    this.loginPassword = this.loginForm.value.loginPassword ?? '';

    this.registerEmail = this.registerForm.value.registerEmail ?? '';
    this.registerPassword = this.registerForm.value.registerPassword ?? '';
  }

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
      tap(allDatas => {
        const randomNumber = Math.floor(Math.random() * allDatas.results.length);
        this.randomImage = allDatas.results[randomNumber].poster_path;
        this.randomName = allDatas.results[randomNumber].original_title;
      }
      )
    ).subscribe();
  }

  SignIn() {
    this.loginAuthentication.SignIn(this.loginEmail, this.loginPassword);

    this.loginEmail = ''
    this.loginPassword = ''
  }

  login() {
    this.authent.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => this.router.navigateByUrl('movies'));
  }

  SignInWithGithub() {
    this.authent.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(() => this.router.navigateByUrl('movies'));
  }

  forgotPasswordSubmit(loginEmail: string) {
    this.loginAuthentication.ForgotPassword(loginEmail);
  }

  onSubmitRegister() {
    console.log('suis la !')
    this.registerService.SignUp(this.registerEmail, this.registerPassword);
    this.registerEmail = '';
    this.registerPassword = '';
  }
}
