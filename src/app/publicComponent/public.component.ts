import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
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
    arrayOfSortedMovies: Array<any> | never
    constructor(private firestore: AngularFirestore, public auth: AngularFireAuth) {
        this.users$ = this.firestore.collection("user").valueChanges();
        this.usersMovies$ = this.firestore.collection('movies').valueChanges()
        this.arrayOfSortedMovies = []
    }

    addItem(allMoviesSorted: unknown | never) {
        this.arrayOfSortedMovies.push(allMoviesSorted)
        this.sortAllElements(this.arrayOfSortedMovies);
    }

    sortAllElements(arrays: any) {
        arrays.sort((a: { date: string | number | Date; }[], b: { date: string | number | Date; }[]) => {
            return <any>new Date(b[0].date) - <any>new Date(a[0].date)
        })

        console.log(arrays);
    }
}
