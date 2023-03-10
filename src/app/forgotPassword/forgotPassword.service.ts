import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";


@Injectable({
    providedIn: 'root'
})
export class ForgotPwdService {
    constructor(public afAuth: AngularFireAuth) {

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
}
