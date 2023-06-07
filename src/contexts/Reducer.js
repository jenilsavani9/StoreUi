export const initialState = {
    user: null,
    cities: null,
    country: null,
    states: null,
    stores: []
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_STORES':
            return {
                ...state,
                stores: action.stores
            }
        case 'ADD_STORES':
            return {
                ...state,
                stores: [...state.stores, action.store]
            }
        case 'REMOVE_STORE':
            const index = state.stores.findIndex(
                (item) => item.storeId == action.item.storeId
            )
            let newStore = [...state.stores]
            if(index >= 0) {
                newStore.splice(index, 1)
            }
            return {
                ...state,
                stores: newStore
            }
        default:
            return state;
    }
}

export default reducer;