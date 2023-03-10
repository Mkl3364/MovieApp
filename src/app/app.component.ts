import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppFormComponent } from './appForm/appForm.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { TestDatabaseComponent } from './testDatabase/testDatabase.component';

@Component({
  standalone: true,
  selector: 'tp-movies-selector',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, CommonModule, MoviesComponent, AppFormComponent, RouterLink, TestDatabaseComponent, HeaderComponent],
})
export class AppComponent {

}
