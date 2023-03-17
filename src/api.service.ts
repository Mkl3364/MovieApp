import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class apiService {
    constructor(private httpClient: HttpClient) { }

    public getMovies(): Observable<any> {
        return this.httpClient.get("https://api.themoviedb.org/3/movie/popular?api_key=81a8a2c4c129dd1c603073a9d974becb&language=en-US&page=1")
    }

    public getGenres(): Observable<any> {
        return this.httpClient.get("https://api.themoviedb.org/3/genre/movie/list?api_key=81a8a2c4c129dd1c603073a9d974becb&language=en-US")
    }

    public getGenresMovies(genreId: number): Observable<any> {
        return this.httpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=81a8a2c4c129dd1c603073a9d974becb&with_genres=${genreId}&primary_release_date.gte=2022-01-01&sort_by=vote_average.desc`)
    }
}
