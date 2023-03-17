import { createReducer, on } from "@ngrx/store"
import produce from "immer"
import { UserInterface } from "../movie/movie.service"
import { userLogged } from "./user.action"

export const featureUserKey = 'user';

export interface UserState {
    user: UserInterface
    // isLogged : boolean
    // moviesLiked: Movie[]
}

export const userInitialState: UserState = {
    user: {
        displayName: '',
        email: '',
        photoURL: ''
    }
}

export const userReducer = createReducer(
    userInitialState,
    on(userLogged, produce((state, {user}) => {
        // state.isLogged = user.isLogged,
        // state.user.push(user)
        state.user = user
        // state.moviesLiked = user.moviesLiked
    }))
)