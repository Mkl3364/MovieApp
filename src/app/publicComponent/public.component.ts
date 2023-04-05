import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CommonModule } from "@angular/common";
@Component({
    standalone: true,
    selector: 'tp-movies-public',
    templateUrl: 'public.component.html',
    styleUrls: ['./public.component.scss'],
    imports: [RouterLink, CommonModule]
})
export class PublicComponent implements OnInit {
    users$: Observable<any>
    constructor(private firestore: AngularFirestore, public auth: AngularFireAuth) {
        this.users$ = this.firestore.collection("user").valueChanges();
    }

    ngOnInit(): void {
        console.log('here in public profile')
    }
    
}