import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    selector: "tp-movies-change-email",
    templateUrl: 'changeEmail.component.html',
    styleUrls: ["./changeEmail.component.scss"],
    imports: [RouterLink, RouterOutlet]
})
export class ChangeEmailComponent {
    private email: string;
    constructor(private readonly db: FormBuilder) {
        this.email = this.emailForm.value.email ?? ""
    }

    emailForm = this.db.group({
        email: ['', Validators.required]
    })

    changeEmailAdress() {
        console.log("hello")
    }
}