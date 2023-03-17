import { Component, OnInit } from "@angular/core";

import { CommonModule } from "@angular/common";

import { HeaderComponent } from '../header/header.component';
import { MovieContainerCommonComponent } from '../movie-container-common/movie-container-common.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { apiService } from "src/api.service";
import { tap } from "rxjs";
import { FooterComponent } from "../footer/footer.component";
import { ActivatedRoute } from "@angular/router";
import { SearchContainerComponent } from "../search-container/search-container.component";


@Component({
	standalone: true,
	selector: 'tp-movies-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	imports: [HeaderComponent, MovieContainerCommonComponent, PaginationComponent, CommonModule, FooterComponent, SearchContainerComponent]
})
export class SearchComponent implements OnInit {
	movies$ = this.apiService.getMoviesByTitle();
	movies: object[] | any;
	currentPage: number;
	totalPages: number;
	query: string | null;
	totalResults: number;

	constructor(private readonly apiService: apiService, private route: ActivatedRoute) {
		this.query = ''
		this.movies = [];
		this.currentPage = 1;
		this.totalPages = 5;
		this.totalResults = 0;
	}

	ngOnInit(): void {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.getMovies(this.route.snapshot.paramMap.get('query')!)
	}

	getMovies(query: string = '') {
		this.query = query
		this.apiService.getMoviesByTitle(this.query, this.currentPage).pipe(tap(filteredMovies => {
			this.movies = filteredMovies
			this.totalPages = filteredMovies.total_pages > 500 ? 500 : filteredMovies.total_pages
			this.totalResults = filteredMovies.total_results;
		})).subscribe();
	}
}
