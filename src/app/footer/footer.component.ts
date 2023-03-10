import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";


@Component({
  standalone: true,
  selector: 'tp-movies-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [RouterLink]
})
export class FooterComponent {

}
