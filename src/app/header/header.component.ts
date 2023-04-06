import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";


@Component({
    standalone: true,
    selector: 'tp-movies-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

    photoURL$: string | Observable<any>;
    userName: string;
    constructor(private storage: AngularFireStorage, private auth: AngularFireAuth, private change: ChangeDetectorRef) {
        this.userName = 'Titan3253';
        this.photoURL$ = '../../assets/img/user_default.png';
    }

    ngOnInit() {
        this.auth.authState.subscribe((user) => {
            if (user) {

                if (user.displayName) {
                    this.userName = user.displayName;
                }
                if (user.photoURL !== null) {
                    this.photoURL$ = user.photoURL;
                }

            }
        });
    }
}
