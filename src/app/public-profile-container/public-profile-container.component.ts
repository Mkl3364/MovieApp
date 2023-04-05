import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Component({
    standalone: true,
    selector: 'tp-movies-public-profile-container',
    templateUrl: 'public-profile-container.html',
    styleUrls: ['./public-profile-container.scss'],
    imports: [CommonModule]
})
export class PublicProfileContainerComponent implements OnInit {
    userMovies$: Observable<any> | undefined
    constructor(private firestore: AngularFirestore) {
        this.displayName = ''
        this.userUid = ''
    }

    @Input() displayName: string;
    @Input() userUid: string;

    ngOnInit(): void {
        this.userMovies$ = this.firestore.doc(`movies/${this.userUid}`).valueChanges()
    }
}