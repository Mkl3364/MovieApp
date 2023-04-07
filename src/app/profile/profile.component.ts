import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { RouterLink, RouterOutlet } from "@angular/router";
import { finalize, Observable, tap } from "rxjs";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Reference } from "@angular/fire/compat/storage/interfaces";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";


@Component({
    standalone: true,
    selector: 'tp-movies-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [RouterLink, RouterOutlet, CommonModule, FooterComponent]
})

export class ProfileComponent implements OnInit {
    imageURL$: Observable<string> | undefined;
    private userId: string;
    userEmail: string;
    userName: string;
    photoURL$: string | Observable<any>;
    selectedFile: File | undefined;
    files$: Reference[] = [];

    constructor(private storage: AngularFireStorage, private auth: AngularFireAuth, private change: ChangeDetectorRef) {
        this.userEmail = 'Loading..';
        this.userName = 'Titan3253';
        this.photoURL$ = '../../assets/img/userWithoutPicture.png';
        this.userId = 'Loading..';
    }

    ngOnInit() {
        this.auth.authState.subscribe((user) => {
            if (user) {
                if (user.email) {
                    this.userEmail = user.email;
                }
                if (user.displayName) {
                    this.userName = user.displayName;
                }
                if (user.photoURL !== null) {
                    this.photoURL$ = user.photoURL;
                }
                if (user.uid) {
                    this.userId = user.uid;
                    this.updateProfileImage();
                }
            }
        });
    }

    updateProfileImage() {
        const getImage = this.storage.ref(`usersImages/${this.userId}`);
        getImage.getDownloadURL().subscribe(photoURL => {
            this.photoURL$ = photoURL;
        });
    }

    changeImage(event: any) {
        this.selectedFile = event.target.files[0];
        this.onSubmitImg();
    }
    onSubmitImg() {
        if (this.selectedFile) {
            const filePath = 'usersImages/' + this.userId;
            const storageRef = this.storage.ref(filePath);
            const task = storageRef.put(this.selectedFile);

            task.snapshotChanges().pipe(
                finalize(() => {
                    storageRef.getDownloadURL().subscribe((downloadUrl: unknown) => {
                        this.updateProfileImage();
                    });
                })
            ).subscribe();
        }
    }
}
