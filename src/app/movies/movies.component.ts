import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { MovieCarouselComponent } from "../movie-carousel/movie-carousel.component";
import { Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { userLogged } from "../state/user.action";
import { userLogSelector } from "../state/user.selector";
import { MovieContainerCommonComponent } from "../movie-container-common/movie-container-common.component";
import { apiService } from "src/api.service";
import { tap } from "rxjs";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { SearchContainerComponent } from "../search-container/search-container.component";

interface genre {
    id: number,
    name: string,
}

@Component({
    standalone: true,
    selector: "tp-movies-movies-api",
    templateUrl: "./movies.component.html",
    styleUrls: ['./movies.component.scss'],
    imports: [CommonModule, HeaderComponent, RouterLink, FooterComponent, MovieCarouselComponent, MovieContainerCommonComponent, PaginationComponent, ReactiveFormsModule, SearchContainerComponent]
})
export class MoviesComponent implements OnInit {

    movies$ = this.apiService.getMovies();
    genre$ = this.apiService.getGenres();
    public userData: any;
    recentMovies: object[] | any;
    genres: genre[];
    genreId: number;
    currentPage: number;
    totalPages: number;
    query: string;

    constructor(private readonly db: FormBuilder, private readonly apiService: apiService, private router: Router, private auth: AngularFireAuth, private store: Store) {

        this.genres = [];
        this.genreId = 0;
        this.recentMovies = [];
        this.currentPage = 1;
        this.totalPages = 5;

        this.auth.authState.subscribe((user) => {
            if (user) {
                this.store.dispatch(userLogged({
                    user: {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        uid: user.uid,
                        isLogged: true
                    }
                }))
                this.store.select(userLogSelector).pipe(
                ).subscribe(user => {
                    // console.log('data', user);
                })
            }
        });

        this.query = this.searchForm.value.query ?? ''

    }


    searchForm = this.db.group({
        query: ['', Validators.required]
    })

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
