import { ChangeDetectorRef, Component } from "@angular/core";
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
export class PublicComponent {
    users$: Observable<any>
    usersMovies$: Observable<any>
    constructor(private firestore: AngularFirestore, public auth: AngularFireAuth) {
        this.users$ = this.firestore.collection("user").valueChanges();
        this.usersMovies$ = this.firestore.collection('movies').valueChanges()
    }


    addItem(newItem: string) {
        console.log(newItem)
    }
}
