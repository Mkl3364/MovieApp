import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router, RouterLink } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CommonModule } from "@angular/common";
import { PublicProfileContainerComponent } from "../public-profile-container/public-profile-container.component";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'tp-movies-public',
    templateUrl: 'public.component.html',
    styleUrls: ['./public.component.scss'],
    imports: [RouterLink, CommonModule, PublicProfileContainerComponent, ReactiveFormsModule]
})
export class PublicComponent implements OnInit {
    users$: Observable<any>
    usersMovies$: Observable<any>
    query: string;
    users: Array<any>

    constructor(private firestore: AngularFirestore, public auth: AngularFireAuth, private readonly db: FormBuilder, private router: Router) {
        this.users$ = this.firestore.collection("user").valueChanges();
        this.usersMovies$ = this.firestore.collection('movies').valueChanges()
        this.query = this.searchForm.value.query ?? ''
        this.users = []
    }

    searchForm = this.db.group({
        query: ['', Validators.required]
    })

    ngOnInit() {
        this.users$.pipe(
            tap(data => {
                console.log(data)
                this.users = data
            })).subscribe()
    }


    submit() {
        if (this.searchForm.value.query !== '') {
            this.users$.pipe(
                tap(data => {
                    this.users = data.filter((filter: any) => {
                        if (this.searchForm.value.query) {
                            return filter.finalUser.displayName.toLowerCase().includes(this.searchForm.value.query.toLowerCase())
                        }
                    })
                })).subscribe()
        }
        else {
            this.users$ = this.firestore.collection("user").valueChanges();
        }

    }
}
