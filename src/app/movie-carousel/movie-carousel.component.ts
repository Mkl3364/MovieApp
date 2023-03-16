import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MoviesService } from '../movie-carousel/movie-carousel.service';
import { map, tap } from 'rxjs';
import { MovieContainerComponent } from '../movie-container/movie-container.component';

interface dataMovies {
	title: string,
	backdrop_path: string,
	vote_average: number,
	genresId: number[],
	genresName?: string[]
}

interface genre {
	id: number,
	name: string,
}

@Component({
	standalone: true,
	selector: 'tp-movies-movie-carousel',
	templateUrl: './movie-carousel.component.html',
	styleUrls: ['./movie-carousel.component.scss'],
	imports: [CommonModule, MovieContainerComponent]
})

export class MovieCarouselComponent implements OnInit {
	movies$ = this.moviesService.getMovies();
	genres$ = this.moviesService.getGenres();
	dataMovies: dataMovies[] = [];

	constructor(private readonly moviesService: MoviesService) { }

	ngOnInit() {
		this.movies$.pipe(
			tap(
				movies => {
					const filteredMovies = movies.results.slice(0, 3)
					for (const movie of filteredMovies) {
						const dataMovie = {
							title: movie.title,
							backdrop_path: movie.backdrop_path,
							vote_average: movie.vote_average,
							genresId: movie.genre_ids
						}
						this.dataMovies.push(dataMovie);
					}
				}
			)
		).subscribe();

		this.genres$.pipe(
			tap(
				genres => {
					for (const movie of this.dataMovies) {
						movie.genresName = []
						for (const genreId of movie.genresId) {
							const genreName = genres.genres.find((genre: genre) => genre.id == genreId).name
							movie.genresName.push(genreName);
						}
					}
				}
			)
		).subscribe();
	}
}
