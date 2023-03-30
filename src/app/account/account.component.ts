import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
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
    public userPassword: string | undefined

    constructor(private store: Store, public router: Router, public auth: AngularFireAuth) {
        this.user$ = this.store.select(userLogSelector)
        this.user$.pipe(tap((account: UserInterface) => {
            this.userEmail = account.email ?? ""
        }))
        this.user$.pipe(tap((account: UserInterface) => {
            this.userPassword = account.uid
        }))
    }

    onClickUserInput() {
        this.router.navigateByUrl('/changeEmail')
    }

    onClickPasswordInput() {
        this.router.navigateByUrl('/changePassword')
    }
}