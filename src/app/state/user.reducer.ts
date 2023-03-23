import { createReducer, on } from "@ngrx/store"
import produce from "immer"
import { UserInterface } from "../movie/movie.service"
import { movieLiked, userLogged } from "./user.action"

export const featureUserKey = 'user';
export const featureKey = 'movie';

export interface UserState {
    user: UserInterface
    // isLogged : boolean
    // moviesLiked: Movie[]
}

export const userInitialState: UserState = {
    user: {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
        isLogged: false,
        moviesLiked: []
    },
}

export const userReducer = createReducer(
    userInitialState,
    on(userLogged, produce((state, {user}) => {
        // state.isLogged = user.isLogged,
        // state.user.push(user)
        state.user = user
        // state.moviesLiked = user.moviesLiked
    })),
    on(movieLiked, produce((state, {movie}) => {
        // state.user.moviesLiked = movie
        state.user.moviesLiked = [...state.user.moviesLiked, movie]
        // state.user.moviesLiked.push(movie)
        // console.log('movies', state.user.moviesLiked)
    }))
)






// export interface MovieState {
//     likedMovies: Movie[],
// }

// export const movieInitialState: MovieState = {
//     likedMovies: [],
// };

export const likesReducer = createReducer(
    userInitialState,
    // on(movieLiked,
    // produce((state, {movie}) => {
    //     state.likedMovies = [movie, ...state.likedMovies];
    // })
    // ),
    on(movieLiked, produce((state, {movie}) => {
        state.user.moviesLiked.push(movie)
    }))
);