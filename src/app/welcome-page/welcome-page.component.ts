import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import firebase from 'firebase/compat/app';
import { tap } from "rxjs";
import { MoviesService } from "../movies/movies.service";
import { LoginFormService } from "../welcome-page/login.service";

@Component({
    standalone: true,
    selector: 'tp-movies-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss'],
    imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet]
})
export class WelcomePageComponent implements OnInit{

  email: string;
  password: string;
  getAllDatas$ = this.moviesService.getMoviesPopular();
  randomImage: string;
  randomName: string;
  btnIsClicked: boolean;

  constructor (private readonly moviesService: MoviesService, private readonly db: FormBuilder, public loginAuthentication: LoginFormService, public authent: AngularFireAuth, private router: Router) {
    this.randomImage = '';
    this.randomName = '';
    this.btnIsClicked = false;

    this.email = this.loginForm.value.email ?? ''
    this.password = this.loginForm.value.password ?? ''
  }

  loginForm = this.db.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
})

  ngOnInit() {
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
    this.loginAuthentication.SignIn(this.email, this.password).then(() => this.router.navigateByUrl('movies'));
    this.email = ''
    this.password= ''
}

login() {
    this.authent.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => this.router.navigateByUrl('movies'));
}
logout() {
    this.authent.signOut();
}

SignInWithGithub() {
    this.authent.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(() => this.router.navigateByUrl('movies'));
}

forgotPasswordSubmit(email: string) {
    this.loginAuthentication.ForgotPassword(email)
}
  
  
}
