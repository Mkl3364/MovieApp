import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import firebase from 'firebase/compat/app';
import { LoginFormService } from "./login.service";


@Component({
    standalone: true,
    selector: 'tp-movies-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet]
})
export class LoginComponent {
    email: string;
    password: string;
    constructor(private readonly db: FormBuilder, public loginAuthentication: LoginFormService, public authent: AngularFireAuth, private router: Router) {
        this.email = this.loginForm.value.email ?? ''
        this.password = this.loginForm.value.password ?? ''
    }

    loginForm = this.db.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    })

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