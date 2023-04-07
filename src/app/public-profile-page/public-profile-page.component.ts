import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Observable } from "rxjs";
import { MyTabsComponent } from "../tabs/tabs.component";

@Component({
    standalone: true,
    selector: 'tp-movies-public-profile-page',
    templateUrl: 'public-profile-page.html',
    styleUrls: ['./public-profile-page.scss'],
    imports: [CommonModule, RouterLink, MyTabsComponent]
})
export class PublicProfilePageComponent {
    user$: Observable<any>
    public query: string;
    constructor(public firestore: AngularFirestore, private route: ActivatedRoute) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.query = this.route.snapshot.paramMap.get('uid')!
        this.user$ = this.firestore.doc(`user/${this.query}`).valueChanges();
    }
}