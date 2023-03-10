import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  standalone: true,
  selector: 'tp-movies-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss'],
})
export class UserImageComponent {
  userImageUrl: string | undefined;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit() {
    const userId = 'user123'; // ID de l'utilisateur 
    const imagePath = `users/${userId}/profile.jpg`; // chemin d'accès à l'image dans Firebase Storage

    // Récupérer l'URL de l'image depuis Firebase Storage
    this.storage.ref(imagePath).getDownloadURL().subscribe((url: string) => {
      this.userImageUrl = url;
    });
  }
}
