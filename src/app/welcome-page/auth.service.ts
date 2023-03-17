import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: unknown;
  
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {}

  async SignIn(email: string, password: string) {
    try {
          await this.afAuth.signInWithEmailAndPassword(email, password);
          this.router.navigateByUrl('movies');
      } catch (error: any) {
          window.alert(error.message);
      }
  }

    async ForgotPassword(passwordResetEmail: string) {
        return this.afAuth
        .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
        // window.alert('Password reset email sent, check your inbox.');
        })
        .catch((error: any) => {
        window.alert(error);
        });
    }
    async verifyResetPasswordCode(code: string) {
        const res = await this.afAuth.verifyPasswordResetCode(code);
        return console.log(res);
    }

    async SignOut() {
        await this.afAuth.signOut();
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
    }

    SignInWithGithub() {
        this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    }

    async SignUp(email: string, password: string) {
        try {
            const result = await this.afAuth
                .createUserWithEmailAndPassword(email, password);
            console.log(result);
        } catch (error: any) {
            window.alert(error.message);
        }
      }
}