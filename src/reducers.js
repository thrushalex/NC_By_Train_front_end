import { SET_ROUTES } from "./actions";

export const routes = (state = [], action) => {
    const { type, payload } = action;
    switch(type) {
        case SET_ROUTES:
            return payload.routes;
        default:
            return routes;
    }
}