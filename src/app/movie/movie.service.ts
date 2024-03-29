import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

export interface Movie {
    user_vote: number;
    userUid: string;
    adult: boolean
    genres : Genre[]
    original_title: string
    overview: string
    poster_path: string
    release_date: string
    status: string
    vote_average: number
    date: string
}

export interface UserInterface {
    displayName: string | null
    email: string | null
    photoURL: string | null
    uid: string
    isLogged : boolean
}

export interface Genre {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})

export class MovieService {
    constructor(private httpClient: HttpClient, public store: Store) {

    }

    public getMovieWithId(id: number | null): Observable<any> {
        return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=81a8a2c4c129dd1c603073a9d974becb&language=en-US`)
    }

    public getMovieCredits(id: number | null): Observable<any> {
        return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=81a8a2c4c129dd1c603073a9d974becb&language=en-US`)
    }
}