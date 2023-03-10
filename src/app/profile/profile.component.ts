import { Component } from "@angular/core";
import { FooterComponent } from "../footer/footer.component";


@Component({
    standalone: true,
    selector: 'tp-movies-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.scss'],
    imports: [FooterComponent]
})
export class ProfileComponent {

}