import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserInterface } from "../movie/movie.service";

@Component({
    standalone: true,
    selector: "tp-movies-change-email",
    templateUrl: 'changeEmail.component.html',
    styleUrls: ["./changeEmail.component.scss"],
    imports: [RouterLink, RouterOutlet, CommonModule, ReactiveFormsModule]
})
export class ChangeEmailComponent implements OnInit {
    public user$: Observable<UserInterface> | undefined
    private email: string;
    public userEmail: string;
    public changed: boolean
    public errorChangingEmail: boolean;
    constructor(private readonly db: FormBuilder, private auth: AngularFireAuth, public store: Store) {
        this.email = this.emailForm.value.email ?? ""
        this.userEmail = "test@popina.com"
        this.changed = false
        this.errorChangingEmail = false
    }

    emailForm = this.db.group({
        email: ['', Validators.required]
    })

    ngOnInit(): void {
        this.auth.authState.subscribe((user) => {
            if (user) {
                if(user.email) {
                    this.userEmail = user.email;
                }
            }
        });
    }

    async changeEmailAdress() {
        try {
            const user  = await this.auth.currentUser
            const userRes = user;
            if (this.emailForm.value.email) {
                const res = await userRes?.updateEmail(this.emailForm.value.email)
                console.log(res)
                this.changed = true
            }
        } catch (error) {
            this.errorChangingEmail = true
        }
    }
}