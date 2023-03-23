import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Movie } from "../movie/movie.service";
import { Observable, tap } from "rxjs";


@Component({
    standalone: true,
    selector: 'tp-movies-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    imports: [CommonModule]
})
export class HeaderComponent {
    
    notificationIsOpen: boolean; 
    private itemsCollection: AngularFirestoreCollection<Movie>;
    items: Observable<Movie[]>;

    constructor(private afs: AngularFirestore) {
		this.notificationIsOpen = false;
        this.itemsCollection = afs.collection<Movie>('movies');
        this.items = this.itemsCollection.valueChanges();
	}

    notifications():void {
        this.notificationIsOpen = !this.notificationIsOpen;
        this.items.pipe(tap(test => console.log(test))).subscribe()
    }
}