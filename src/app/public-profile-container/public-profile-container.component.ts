import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, tap } from "rxjs";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from "@angular/router";

@Component({
    standalone: true,
    selector: 'tp-movies-public-profile-container',
    templateUrl: 'public-profile-container.html',
    styleUrls: ['./public-profile-container.scss'],
    imports: [CommonModule, FooterComponent, RouterLink]
})
export class PublicProfileContainerComponent implements OnInit {
    userMovies$: Observable<any> | undefined
    public stars: number[];
    constructor(private firestore: AngularFirestore) {
        this.displayName = ''
        this.userUid = ''
        this.photoURL = ''
        this.stars = [1, 2, 3, 4, 5]
    }

    @Input() displayName: string;
    @Input() userUid: string;
    @Input() photoURL: string;

    ngOnInit(): void {
        this.userMovies$ = this.firestore.doc(`movies/${this.userUid}`).valueChanges();
        this.userMovies$.pipe(
            tap(
                data => {
                    data?.sort((a: { date: { getTime: () => number; }; }, b: { date: { getTime: () => number; }; }) => a.date.getTime() - b.date.getTime())
                }
            )
        ).subscribe();
    }
}
