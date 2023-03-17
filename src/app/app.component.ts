import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppFormComponent } from './appForm/appForm.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { TestDatabaseComponent } from './testDatabase/testDatabase.component';
import { UserImageComponent } from './user-image/user-image.component';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
initializeApp(environment.firebase);

@Component({
  standalone: true,
  selector: 'tp-movies-selector',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, CommonModule, MoviesComponent, AppFormComponent, RouterLink, TestDatabaseComponent, HeaderComponent, FooterComponent, MovieCarouselComponent],
})

export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

}
