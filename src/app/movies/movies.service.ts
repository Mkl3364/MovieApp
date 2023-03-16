import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    constructor(private httpClient: HttpClient) {

        // console.log(this.getMovies())

    }

    public getMovies(): Observable<any> {
        return this.httpClient.get("https://api.themoviedb.org/3/movie/popular?api_key=81a8a2c4c129dd1c603073a9d974becb&language=en-US&page=1")
    }
}
