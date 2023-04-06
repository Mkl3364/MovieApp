import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
    standalone: true,
    selector: 'tp-movies-seen-component',
    templateUrl: 'seen.component.html',
    styleUrls: ['./seen.component.scss'],
    imports: [CommonModule]
})
export class SeenComponent {
    moviesLiked$: Observable<any>
    public query: string;
    constructor(public route: ActivatedRoute, public firestore: AngularFirestore) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.query = this.route.snapshot.paramMap.get('uid')!
        this.moviesLiked$ = this.firestore.doc(`movies/${this.query}`).valueChanges()
    }
}