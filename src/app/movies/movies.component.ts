import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MoviesService } from "./movies.service";
//import { UserImageComponent } from '../user-image/user-image.component';
import { NotificationPushComponent } from "../notification-push/notification-push.component";

@Component({
    standalone: true,
    selector: "tp-movies-movies-api",
    templateUrl: "./movies.component.html",
    styleUrls: [],
    imports: [CommonModule, HeaderComponent, FooterComponent, NotificationPushComponent]
})
export class MoviesComponent {
    movies$ = this.moviesService.getMovies();
    constructor(private readonly moviesService: MoviesService) {

    }
}
