/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { movieLiked } from "../state/user.action";
import { UserState } from "../state/user.reducer";
// import { MovieState } from "../state/like.reducer";
// import { likedMoviesSelector } from "../state/like.selector";
// import { movieLiked } from "../state/likes.action";
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
    public liked: boolean;
    movie$ = this.movieService.getMovieWithId(parseInt(this.route.snapshot.paramMap.get('id')!));
    castMovie$ = this.movieService.getMovieCredits(parseInt(this.route.snapshot.paramMap.get('id')!))
    constructor(private route: ActivatedRoute, public movieService: MovieService, private store: Store<UserState>) {
        this.addedMovies$ = this.store.select((state) => state.user.moviesLiked)
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
        this.store.dispatch(movieLiked({movie}))
        // console.log(this.store.select((state) => state.addedMovies))
        this.liked = true
    }


}