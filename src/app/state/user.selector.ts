import { createFeatureSelector, createSelector } from "@ngrx/store";
import { featureUserKey, UserState } from "./user.reducer";

export const userState = createFeatureSelector<UserState>(featureUserKey);
// export const movieState = createFeatureSelector<MovieState>(featureKey);


export const userLogSelector = createSelector(
    userState,
    (userState: UserState) => userState.user
)



export const countLikedMovies = createSelector(
    userState,
    (movieState: UserState) => movieState.user.moviesLiked.length
);

export const likedMoviesSelector = createSelector(
    userState,
    (movieState: UserState) => movieState.user.moviesLiked
)