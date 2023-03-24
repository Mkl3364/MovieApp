import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	standalone: true,
	selector: 'tp-movies-search-container',
	templateUrl: './search-container.component.html',
	styleUrls: ['./search-container.component.scss'],
	imports: [ReactiveFormsModule]
})
export class SearchContainerComponent {

	@Output() queryChange = new EventEmitter<string>();

	query: string;
	constructor(private readonly db: FormBuilder, private router: Router) {

		this.query = this.searchForm.value.query ?? ''
	}

	searchForm = this.db.group({
		query: ['', Validators.required]
	})

	submit() {
		this.router.navigate([`/search/${this.searchForm.value.query}`]);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.queryChange.emit(this.searchForm.value.query!);

	}
}
