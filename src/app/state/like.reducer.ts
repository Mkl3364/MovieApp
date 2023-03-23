export {}
// import { createReducer, on } from "@ngrx/store";
// import produce from "immer";
// import { Movie } from "../movie/movie.service";
// import { movieLiked } from "./likes.action";

// export const featureKey = 'movie';

// export interface MovieState {
//     likedMovies: Movie[],
// }

// export const movieInitialState: MovieState = {
//     likedMovies: [],
// };

// export const likesReducer = createReducer(
//     movieInitialState,
//     // on(movieLiked,
//     // produce((state, {movie}) => {
//     //     state.likedMovies = [movie, ...state.likedMovies];
//     // })
//     // ),
//     on(movieLiked, produce((state, {movie}) => {
//         state.likedMovies.push(movie)
//     }))
// );