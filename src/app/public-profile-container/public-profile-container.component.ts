import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { FooterComponent } from "../footer/footer.component";

@Component({
    standalone: true,
    selector: 'tp-movies-public-profile-container',
    templateUrl: 'public-profile-container.html',
    styleUrls: ['./public-profile-container.scss'],
    imports: [CommonModule, FooterComponent]
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
        this.userMovies$ = this.firestore.doc(`movies/${this.userUid}`).valueChanges()
    }
}
