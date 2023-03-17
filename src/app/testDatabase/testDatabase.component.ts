import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";

export interface Movie {
    title: string;
}

@Component({
    standalone: true,
    selector: 'tp-movies-test-database',
    templateUrl: 'testDatabase.component.html',
    styleUrls: ['testDatabase.component.scss'],
    imports: [CommonModule]
})
export class TestDatabaseComponent {
    private itemsCollection: AngularFirestoreCollection<Movie>;
    items: Observable<Movie[]>;
    constructor(private afs: AngularFirestore) {
        this.itemsCollection = afs.collection<Movie>('movies');
        this.items = this.itemsCollection.valueChanges();
    } 
}