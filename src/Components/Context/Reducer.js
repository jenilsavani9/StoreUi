export const initialState = {
    user: null,
    cities: null,
    country: null,
    states: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_CITIES':
            return {
                ...state,
                user: action.cities
            }
        case 'SET_STATES':
            return {
                ...state,
                user: action.states
            }
        case 'SET_COUNTRYS':
            return {
                ...state,
                user: action.country
            }
        default:
            return state;
    }
}

export default reducer;