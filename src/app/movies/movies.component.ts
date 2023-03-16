import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MovieCarouselComponent } from "../movie-carousel/movie-carousel.component";
import { MoviesService } from "./movies.service";
import { MovieContainerCommonComponent } from "../movie-container-common/movie-container-common.component";
import { apiService } from "src/api.service";
import { tap } from "rxjs";

interface genre {
    id: number,
    name: string,
}

@Component({
    standalone: true,
    selector: "tp-movies-movies-api",
    templateUrl: "./movies.component.html",
    styleUrls: ['./movies.component.scss'],
    imports: [CommonModule, HeaderComponent, FooterComponent, MovieCarouselComponent, MovieContainerCommonComponent]
})
export class MoviesComponent implements OnInit {

    movies$ = this.moviesService.getMovies();
    genre$ = this.apiService.getGenres();
    recentMovies: object[] | any;
    genres: genre[];

    constructor(private readonly moviesService: MoviesService, private readonly apiService: apiService) {
        this.genres = [];
        this.recentMovies = [];
    }

    ngOnInit(): void {
        this.genre$.pipe(
            tap(allDataGenres => {
                for (const genreData of allDataGenres.genres) {
                    this.genres.push(genreData);
                }
            })
        ).subscribe();

        this.getPopularMovies()
    }

    getPopularMovies() {
        this.movies$.pipe(
            tap(recentMovies => this.recentMovies = recentMovies)
        ).subscribe()
    }

    filterGenre(genreId: number) {
        this.apiService.getGenresMovies(genreId).pipe(tap(allGenreFilms => this.recentMovies = allGenreFilms)).subscribe();
        console.log(this.recentMovies)
    }
}
