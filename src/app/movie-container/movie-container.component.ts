import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'tp-movies-movie-container',
  templateUrl: './movie-container.component.html',
  styleUrls: ['./movie-container.component.scss'],
  imports: [CommonModule, RouterLink, RouterOutlet]
})
export class MovieContainerComponent {

  constructor() {
    this.title = '';
    this.genresName = [];
    this.backdrop_path = '';
    this.vote_average = 0;
    this.id = 0
  }

  @Input() title: string;
  @Input() backdrop_path: string;
  @Input() vote_average: number;
  @Input() genresName?: string[];
  @Input() id: number;

}
