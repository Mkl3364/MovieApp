import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { PaginationComponent } from "../pagination/pagination.component";
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
    imports: [CommonModule, HeaderComponent, FooterComponent, MovieCarouselComponent, MovieContainerCommonComponent, PaginationComponent]
})
export class MoviesComponent implements OnInit {

    movies$ = this.apiService.getMovies();
    genre$ = this.apiService.getGenres();
    recentMovies: object[] | any;
    genres: genre[];
    genreId: number;
    currentPage: number;
    totalPages: number;

    constructor(private readonly moviesService: MoviesService, private readonly apiService: apiService) {
        this.genres = [];
        this.genreId = 0;
        this.recentMovies = [];
        this.currentPage = 1;
        this.totalPages = 5;
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
            tap(recentMovies => {
                this.recentMovies = recentMovies
                this.totalPages = recentMovies.total_pages > 500 ? 500 : recentMovies.total_pages
            })
        ).subscribe()
    }

    filterGenre(genreId: number) {
        this.genreId = genreId;
        this.apiService.getGenresMovies(genreId).pipe(tap(allGenreFilms => this.recentMovies = allGenreFilms)).subscribe();
    }

    onPageChanged(e: number) {
        this.currentPage = e
        if (this.genreId == 0) {
            this.apiService.getMovies(e).pipe(tap(allGenreFilms => {
                this.recentMovies = allGenreFilms
                this.totalPages = allGenreFilms.total_pages > 500 ? 500 : allGenreFilms.total_pages
            }
            )).subscribe();
        }
        else {
            this.apiService.getGenresMovies(this.genreId, e).pipe(tap(allGenreFilms => {
                this.recentMovies = allGenreFilms
                this.totalPages = allGenreFilms.total_pages > 500 ? 500 : allGenreFilms.total_pages
            })).subscribe();
        }
    }
}
