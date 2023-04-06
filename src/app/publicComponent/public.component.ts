import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CommonModule } from "@angular/common";
import { PublicProfileContainerComponent } from "../public-profile-container/public-profile-container.component";
@Component({
    standalone: true,
    selector: 'tp-movies-public',
    templateUrl: 'public.component.html',
    styleUrls: ['./public.component.scss'],
    imports: [RouterLink, CommonModule, PublicProfileContainerComponent]
})
export class PublicComponent implements OnInit {
    users$: Observable<any>
    usersMovies$: Observable<any>
    constructor(private firestore: AngularFirestore, public auth: AngularFireAuth) {
        this.users$ = this.firestore.collection("user").valueChanges();
        // this.auth.authState.subscribe((user) => {
        //     this.usersMovies$ = this.firestore.doc(`movies/${user?.uid}`).get().pipe((res) => res);
        //     console.log(this.firestore.doc(`movies/${user?.uid}`).get().pipe((res) => res))
        // })
        this.usersMovies$ = this.firestore.collection('movies').valueChanges()
    }

    ngOnInit(): void {
        console.log('here in public profile')
    }
    
}