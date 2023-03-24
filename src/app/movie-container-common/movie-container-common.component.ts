import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
	standalone: true,
	selector: 'tp-movies-movie-container-common',
	templateUrl: './movie-container-common.component.html',
	styleUrls: ['./movie-container-common.component.scss'],
	imports: [RouterLink, RouterOutlet]
})
export class MovieContainerCommonComponent implements OnInit {

	backgroundImage: string;

	constructor() {
		this.title = '';
		this.backdrop_path = '';
		this.vote_average = 0;
		this.release_date = '';
		this.backgroundImage = '';
		this.id = 0;
	}

	@Input() title: string;
	@Input() backdrop_path: string;
	@Input() vote_average: number;
	@Input() release_date: string;
	@Input() id: number;

	ngOnInit() {
		if (!this.backdrop_path) {
			this.backgroundImage = '/assets/img/img-not-found.jpg';
		} else {
			this.backgroundImage = `https://image.tmdb.org/t/p/w500${this.backdrop_path}`;
		}
	}
}
