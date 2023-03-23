import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { MoviesService } from "./movies.service";
import { Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { userLogged } from "../state/user.action";
import { userLogSelector } from "../state/user.selector";
//import { UserImageComponent } from '../user-image/user-image.component';

@Component({
    standalone: true,
    selector: "tp-movies-movies-api",
    templateUrl: "./movies.component.html",
    styleUrls: [],
    imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink]
})
export class MoviesComponent {
    movies$ = this.moviesService.getMoviesPopular();
    public userData: any;
    constructor(private readonly moviesService: MoviesService, private router: Router, private store: Store, public auth: AngularFireAuth) {
    }
}
