import { createAction, props } from "@ngrx/store";
import { UserInterface } from "../movie/movie.service";

export const userLogged = createAction('User log', props<{user: UserInterface}>());