import { createReducer, on } from "@ngrx/store"
import produce from "immer"
import { Movie, UserInterface } from "../movie/movie.service"
import { movieLiked, userLogged } from "./user.action"

export const featureUserKey = 'user';
export const featureKey = 'movie';

export interface UserState {
    user: UserInterface
    moviesLiked: Movie[]
}

export const userInitialState: UserState = {
    user: {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
        isLogged: false,
    },
    moviesLiked: []
}

export const userReducer = createReducer(
    userInitialState,
    on(userLogged, produce((state, {user}) => {
        state.user = user
    })),
    on(movieLiked, produce((state, {movie}) => {
        state.moviesLiked = [...state.moviesLiked, movie]
    }))
)