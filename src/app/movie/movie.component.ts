/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { movieLiked } from "../state/user.action";
import { UserState } from "../state/user.reducer";
import { likedMoviesSelector, userLogSelector } from "../state/user.selector";
import { Movie, MovieService } from "./movie.service";


@Component({
    standalone: true,
    selector: 'tp-movies-movie',
    templateUrl: 'movie.component.html',
    styleUrls: ['./movie.component.scss'],
    imports: [CommonModule, RouterLink, RouterOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
    public addedMovies$
    public userIsLogged$
    public userUid$: any;
    public liked: boolean;
    movie$ = this.movieService.getMovieWithId(parseInt(this.route.snapshot.paramMap.get('id')!));
    castMovie$ = this.movieService.getMovieCredits(parseInt(this.route.snapshot.paramMap.get('id')!))
    constructor(private route: ActivatedRoute, public movieService: MovieService, private store: Store<UserState>) {
        this.addedMovies$ = this.store.select((state) => state.moviesLiked)
        this.store.select(likedMoviesSelector).pipe(
          ).subscribe(data => {
            console.log('movies liked', data);
          })
        this.liked = false
        this.userIsLogged$ = this.store.select(userLogSelector).pipe().subscribe(data => console.log('user', data.isLogged))
    }
    ngOnInit(): void {
        console.log("fdfgfd")
    }

    addMovieToLikes(movie: Movie) {
        let getUserUid = ''
        this.userUid$ = this.store.select(userLogSelector)
        this.userUid$.pipe(tap((user: any) => getUserUid = user.uid)).subscribe()
        this.store.dispatch(movieLiked({movie : {
            ...movie,
            userUid: getUserUid
        }}))
        this.liked = true
    }


}