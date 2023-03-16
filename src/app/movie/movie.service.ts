import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class MovieService {
    constructor(private httpClient: HttpClient) {

    }

    public getMovieWithId(id: number | null): Observable<any> {
        return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=81a8a2c4c129dd1c603073a9d974becb&language=en-US`)
    }

    public getMovieCredits(id: number | null): Observable<any> {
        return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=81a8a2c4c129dd1c603073a9d974becb&language=en-US`)
    }
}