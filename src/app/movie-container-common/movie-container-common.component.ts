import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'tp-movies-movie-container-common',
  templateUrl: './movie-container-common.component.html',
  styleUrls: ['./movie-container-common.component.scss']
})
export class MovieContainerCommonComponent implements OnInit {

  constructor() {
    this.title = "";
    this.backdrop_path = "";
    this.vote_average = 0;
    this.release_date = ""
  }

  @Input() title: string;
  @Input() backdrop_path: string;
  @Input() vote_average: number;
  @Input() release_date: string;

  ngOnInit() {
    console.log(this.title);
  }
}
