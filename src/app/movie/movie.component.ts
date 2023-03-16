/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";
import { map } from "rxjs";
import { MovieService } from "./movie.service";


@Component({
    standalone: true,
    selector: 'tp-movies-movie',
    templateUrl: 'movie.component.html',
    styleUrls: ['./movie.component.scss'],
    imports: [CommonModule, RouterLink, RouterOutlet]
})
export class MovieComponent implements OnInit {
    movie$ = this.movieService.getMovieWithId(parseInt(this.route.snapshot.paramMap.get('id')!));
    castMovie$ = this.movieService.getMovieCredits(parseInt(this.route.snapshot.paramMap.get('id')!))
    constructor(private route: ActivatedRoute, public movieService: MovieService) {
    }
    ngOnInit(): void {
        console.log("fdfgfd")
    }

    addMovieToLikes() {
        console.log("added to likes")
    }
}