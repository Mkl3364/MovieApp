import { CommonModule } from "@angular/common";
import { Component, Input, NgIterable, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, tap } from "rxjs";
import { FooterComponent } from "../footer/footer.component";
import { Output, EventEmitter } from '@angular/core';

@Component({
    standalone: true,
    selector: 'tp-movies-public-profile-container',
    templateUrl: 'public-profile-container.html',
    styleUrls: ['./public-profile-container.scss'],
    imports: [CommonModule, FooterComponent]
})
export class PublicProfileContainerComponent implements OnInit {
    userMovies$: Observable<any> | undefined
    dataMovies$: Observable<any> | undefined
    public stars: number[];
    userMovies: any;
    constructor(private firestore: AngularFirestore) {
        this.displayName = ''
        this.userUid = ''
        this.photoURL = '';
        this.stars = [1, 2, 3, 4, 5]
    }

    @Input() displayName: string;
    @Input() userUid: string;
    @Input() photoURL: string;
    @Output() newItemEvent = new EventEmitter<string>();

    ngOnInit(): void {
        this.userMovies$ = this.firestore.doc(`movies/${this.userUid}`).valueChanges();

        this.userMovies$.pipe(
            tap(
                data => {
                    if (data != undefined) {
                        this.userMovies = data?.movies.sort((firstDate: { date: string | number | Date; }, secondeDate: { date: string | number | Date; }) => {
                            return <any>new Date(secondeDate.date) - <any>new Date(firstDate.date);
                          });
                          this.newItemEvent.emit(data.movies);
                    }
                }
            )
        ).subscribe();
    }
}
