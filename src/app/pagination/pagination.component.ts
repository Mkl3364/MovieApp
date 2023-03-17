import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'tp-movies-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [CommonModule]
})
export class PaginationComponent {

  constructor() {
    this.currentPage = 0;
    this.totalPages = 0;
  }

  @Input() totalPages: number;
  @Input() currentPage: number;
  @Output() pageChanged = new EventEmitter<number>();

  get pages(): number[] {
    const visiblePages = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  }

  onPageChange(page: number) {
    this.pageChanged.emit(page);
  }

}
