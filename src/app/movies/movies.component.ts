import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MoviesService } from "./movies.service";

@Component({
    standalone: true,
    selector: "tp-movies-movies-api",
    templateUrl: "./movies.component.html",
    styleUrls: ['./movies.component.scss'],

    imports: [CommonModule, HeaderComponent, FooterComponent]
})
export class MoviesComponent {
    movies$ = this.moviesService.getMovies();
    constructor(private readonly moviesService: MoviesService) {

    }
}
