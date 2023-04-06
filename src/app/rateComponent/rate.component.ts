import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
    standalone: true,
    selector: 'tp-movies-rate-component',
    templateUrl: 'rate.component.html',
    styleUrls: ['./rate.component.scss'],
    imports: [CommonModule]
})
export class RateComponent {
    moviesLiked$: Observable<any>
    public query: string;
    constructor(public firestore: AngularFirestore, public route: ActivatedRoute) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.query = this.route.snapshot.paramMap.get('uid')!
        this.moviesLiked$ = this.firestore.doc(`movies/${this.query}`).valueChanges()
    }
}