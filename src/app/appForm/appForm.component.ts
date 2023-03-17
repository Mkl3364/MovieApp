import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Validators } from '@angular/forms';
import { AppFormService } from "./appForm.service";

@Component({
    standalone: true,
    selector: "tp-movies-app-form",
    templateUrl: "./appForm.component.html",
    styleUrls: [],
    imports: [ReactiveFormsModule, CommonModule]
})
export class AppFormComponent {
    constructor(private readonly db: FormBuilder, public authenticationService: AppFormService) {
        this.email = this.profileForm.value.email ?? 'test'
        this.password = this.profileForm.value.password ?? 'azerty123'
        this.title = ""
    }

    email: string;
    password: string;

    title: string;

    profileForm = this.db.group({
        email: ['', Validators.required],
        password: ['']
    })


    addFilmForm = this.db.group({
        title: ['', Validators.required]
    })

    onSubmitAddDatabase() {
        this.authenticationService.AddDatabase(this.title)
        this.title = ''
    }
}
