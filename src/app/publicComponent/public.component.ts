import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";


@Component({
    standalone: true,
    selector: 'tp-movies-public',
    templateUrl: 'public.component.html',
    styleUrls: ['./public.component.scss'],
    imports: [RouterLink]
})
export class PublicComponent {
    
}