import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { UserInterface } from "../movie/movie.service";
import { userLogSelector } from "../state/user.selector";


@Component({
    standalone: true,
    selector: "tp-movies-account",
    templateUrl: "account.component.html",
    styleUrls: ['./account.component.scss'],
    imports: [RouterLink, RouterOutlet, CommonModule]
})
export class AccountComponent {
    public user$: Observable<UserInterface> | undefined
    public userEmail: string | undefined
    public userPasword: string | undefined

    constructor(private store: Store, public router: Router) {
        this.user$ = this.store.select(userLogSelector)
        this.user$.pipe(tap((account: UserInterface) => {
            this.userEmail = account.email ?? ""
        }))
        this.user$.pipe(tap((account: UserInterface) => {
            this.userPasword = account.uid
        }))
    }

    onClickUserInput() {
        this.router.navigateByUrl('/changeEmail')
    }
}