import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    constructor(private httpClient: HttpClient) {

    }


    public getGenres(): Observable<any> {
        return this.httpClient.get("https://api.themoviedb.org/3/genre/movie/list?api_key=81a8a2c4c129dd1c603073a9d974becb&language=en-US")
    }


}
