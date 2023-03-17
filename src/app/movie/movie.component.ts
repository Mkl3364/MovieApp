/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { MovieState } from "../state/like.reducer";
import { likedMoviesSelector } from "../state/like.selector";
import { movieLiked } from "../state/likes.action";
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
    public liked: boolean;
    movie$ = this.movieService.getMovieWithId(parseInt(this.route.snapshot.paramMap.get('id')!));
    castMovie$ = this.movieService.getMovieCredits(parseInt(this.route.snapshot.paramMap.get('id')!))
    constructor(private route: ActivatedRoute, public movieService: MovieService, private store: Store<MovieState>) {
        this.addedMovies$ = this.store.select((state) => state.likedMovies)
        this.store.select(likedMoviesSelector).pipe(
          ).subscribe(data => {
            console.log('data', data);
          })
        this.liked = false
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