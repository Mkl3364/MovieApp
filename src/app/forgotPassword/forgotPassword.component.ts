import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { ForgotPwdService } from "./forgotPassword.service";

@Component({
    standalone: true,
    selector: 'tp-movies-forgot-password',
    templateUrl: './forgotPassword.component.html',
    styleUrls: ['./forgotPassword.component.scss'],
    imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet]
})
export class ForgotPasswordComponent {
    email: string;
    emailSent: boolean;
    constructor(private readonly db: FormBuilder, public forgotPwdService: ForgotPwdService , public authent: AngularFireAuth, private router: Router) {
        this.email = this.forgotPwdForm.value.email ?? ""
        this.emailSent = false;
    }

    forgotPwdForm = this.db.group({
        email: ['', Validators.required]
    })

    forgotPasswordSubmit() {
        this.forgotPwdService.ForgotPassword(this.email)
        this.email = ''
        this.emailSent = true;
    }

}