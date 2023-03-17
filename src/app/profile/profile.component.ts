import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";


@Component({
    standalone: true,
    selector: 'tp-movies-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [RouterLink, RouterOutlet]
})
export class ProfileComponent {
    
}