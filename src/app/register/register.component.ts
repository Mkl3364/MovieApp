import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { RegisterFormService } from "./register.service";


@Component({
    standalone: true,
    selector: 'tp-movies-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet]
})
export class RegisterComponent {
    email: string;
    password: string;
    constructor(private db: FormBuilder, public registerService: RegisterFormService) {
        this.email = this.registerForm.value.email ?? '',
        this.password = this.registerForm.value.password ?? ''
    }

    registerForm = this.db.group({
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    })

    onSubmitRegister() {
        this.registerService.SignUp(this.email, this.password)
        this.email = ''
        this.password = ''
    }
}