import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { UserInterface } from "../movie/movie.service";

@Component({
    standalone: true,
    selector: "tp-movies-change-password",
    templateUrl: 'changePassword.component.html',
    styleUrls: ['./changePassword.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class ChangePasswordComponent {
    public user$: Observable<UserInterface> | undefined
    public changed: boolean
    private password: string
    public errorChangingPassword: boolean
    constructor(private readonly db: FormBuilder, private auth: AngularFireAuth) {
        this.password = this.passwordForm.value.password ?? ""
        this.changed = false
        this.errorChangingPassword = false
    }

    passwordForm = this.db.group({
        password: ['', Validators.required]
    })

    async changePassword() {
        try {
            const user  = await this.auth.currentUser
            const userRes = user;
            if (this.passwordForm.value.password) {
                const res = await userRes?.updatePassword(this.passwordForm.value.password)
                console.log(res)
                this.changed = true
            }
        } catch (error) {
            this.errorChangingPassword = true;
        }
    }   
}