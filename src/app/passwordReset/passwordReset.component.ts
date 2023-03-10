import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { filter } from 'rxjs/operators';
import { ForgotPwdService } from "../forgotPassword/forgotPassword.service";

@Component({
    standalone: true,
    selector: 'tp-movies-password-reset',
    templateUrl: 'passwordReset.component.html',
    styleUrls: ['./passwordReset.component.scss'],
    imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet]
})
export class ResetPasswordComponent {
    constructor(private readonly db: FormBuilder, public forgotPwdService: ForgotPwdService , public authent: AngularFireAuth, private router: Router, private query: ActivatedRoute) {
        this.code = ''
        this.password = this.resetPasswordForm.value.password ?? ''
    }

    password: string;
    code: string;

    resetPasswordForm = this.db.group({
        password: ['', Validators.required]
    })

    onSubmitResetPassword() {
        this.code = this.query.snapshot.queryParams['oobCode'];
        console.log(this.code)
        this.forgotPwdService.verifyResetPasswordCode(this.code).then((res) => console.log(res))
        this.forgotPwdService.confirmPasswordReset(this.code, this.password);
    }
}