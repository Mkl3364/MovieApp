import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MovieCarouselComponent } from "../movie-carousel/movie-carousel.component";
import { MoviesService } from "./movies.service";
import { MovieContainerCommonComponent } from "../movie-container-common/movie-container-common.component";

@Component({
    standalone: true,
    selector: "tp-movies-movies-api",
    templateUrl: "./movies.component.html",
    styleUrls: ['./movies.component.scss'],
    imports: [CommonModule, HeaderComponent, FooterComponent, MovieCarouselComponent, MovieContainerCommonComponent]
})
export class MoviesComponent {
    movies$ = this.moviesService.getMovies();
    constructor(private readonly moviesService: MoviesService) {

    }
}
