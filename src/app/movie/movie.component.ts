/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule, Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, of, switchMap, tap, withLatestFrom } from "rxjs";
import { movieLiked } from "../state/user.action";
import { UserState } from "../state/user.reducer";
import { likedMoviesSelector, userLogSelector } from "../state/user.selector";
import { Movie, MovieService, UserInterface } from "./movie.service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FormsModule } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
    standalone: true,
    selector: 'tp-movies-movie',
    templateUrl: 'movie.component.html',
    styleUrls: ['./movie.component.scss'],
    imports: [CommonModule, RouterLink, RouterOutlet, ShareButtonsModule, ShareIconsModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
    public addedMovies$
    public userUid$: Observable<UserInterface> | undefined
    public uid: string;
    public seen: boolean;
    public liked: boolean;
    public openShare: boolean;
    public stars: number[];
    public selectedStarValue: number;
    movie$ = this.movieService.getMovieWithId(parseInt(this.route.snapshot.paramMap.get('id')!));
    castMovie$ = this.movieService.getMovieCredits(parseInt(this.route.snapshot.paramMap.get('id')!))
    constructor(private route: ActivatedRoute, public movieService: MovieService, private store: Store<UserState>, private firestore: AngularFirestore, public auth: AngularFireAuth, private location: Location) {
        this.seen = false
        this.addedMovies$ = this.store.select((state) => state.moviesLiked)
        this.store.select(likedMoviesSelector).pipe(
        ).subscribe(data => data)
        this.liked = false
        this.openShare = false
        this.stars = [1, 2, 3, 4, 5]
        this.selectedStarValue = 0;
        this.uid = ''
    }
    async ngOnInit() {
        const user = await this.auth.currentUser
        const userRes = user
        this.firestore.doc(`movies/${userRes?.uid}`).get().subscribe(x => x.data())

    }

    goBack() {
        this.location.back();
    }

    addMovieToLikes(movie: Movie) {
        this.userUid$ = this.store.select(userLogSelector)
        this.userUid$.pipe(tap((t: UserInterface) =>  {
            this.store.dispatch(movieLiked({movie : {
                ...movie,
                userUid: t.uid,
                date : new Date().toLocaleString('fr-FR', {
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
            }}))
            
        }), switchMap((userUid) => {
            return of(userUid).pipe(withLatestFrom(this.store.select(likedMoviesSelector)))
        })).subscribe(([userUid, movies]: [UserInterface, Movie[]]) => {
            this.firestore.doc(`movies/${userUid.uid}`).update({ movies })
            this.seen = true;
        })
        this.liked = true
    }

    clickOnShareOpen() {
        this.openShare = !this.openShare
    }

    countStar(star: number, movie: Movie) {
        this.selectedStarValue = star;
        this.store.select(userLogSelector).pipe(tap((t: UserInterface) =>  {
            this.store.dispatch(movieLiked({movie : {
                ...movie,
                userUid: t.uid,
                user_vote: star,
                date : new Date().toLocaleString('fr-FR', {
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
            }}))
            
        }), switchMap((userUid) => {
            return of(userUid).pipe(withLatestFrom(this.store.select(likedMoviesSelector)))
        })).subscribe(([userUid, movies]: [UserInterface, Movie[]]) => {
            this.firestore.doc(`movies/${userUid.uid}`).update({ movies })
        })
    }
}
