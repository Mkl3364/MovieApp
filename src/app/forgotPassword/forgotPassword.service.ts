import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class ForgotPwdService {
    constructor(public afAuth: AngularFireAuth, public router: Router,) {

    }
    async ForgotPassword(passwordResetEmail: string) {
        try {
            await this.afAuth
                .sendPasswordResetEmail(passwordResetEmail);
            window.alert('Password reset email sent, check your inbox.');
        } catch (error) {
            window.alert(error);
        }
    }

    async verifyResetPasswordCode(code: string) {
        const res = await this.afAuth.verifyPasswordResetCode(code);
        return console.log(res);
    }

    async confirmPasswordReset(code: string, password: string) {
        this.afAuth
        .confirmPasswordReset(code, password)
        .then(() => this.router.navigateByUrl(''))
    }
}
