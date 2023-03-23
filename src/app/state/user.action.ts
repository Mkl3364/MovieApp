import { createAction, props } from "@ngrx/store";
import { Movie, UserInterface } from "../movie/movie.service";

export const userLogged = createAction('User log', props<{user: UserInterface}>());
export const movieLiked = createAction('Movie liked', props<{ movie: Movie }>());
