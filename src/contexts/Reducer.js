export const initialState = {
  user: null,
  cities: null,
  country: null,
  states: null,
  stores: [],
  features: []
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
        (item) => item.id == action.item.id
      )
      let newStore = [...state.stores]
      if (index >= 0) {
        newStore.splice(index, 1)
      }
      return {
        ...state,
        stores: newStore
      }
    case 'EDIT_STORE':
      var editItem = state.stores?.map((item) => {
        if (item.id == action.item.id) {
          return action.item
        } else {
          return item
        }
      })
      return {
        ...state,
        stores: editItem
      }
    case 'SET_FEATURE':
      return {
        ...state,
        features: action.features
      }
    case 'ADD_FEATURE':
      return {
        ...state,
        features: [...state.features, action.features]
      }
    case 'EDIT_FEATURE':
      var editFeature = state.features?.map((item) => {
        if (item.id == action.item.id) {
          return action.item
        } else {
          return item
        }
      })
      return {
        ...state,
        features: editFeature
      }
    case 'REMOVE_FEATURE':
      const removeFeature = state.features.findIndex(
        (item) => item.id == action.features.id
      )
      let newFeature = [...state.features]
      if (removeFeature >= 0) {
        newFeature.splice(removeFeature, 1)
      }
      return {
        ...state,
        features: newFeature
      }
    case 'MODAL_STORE':
      return {
        ...state,
        modalStore: action.item
      }
    case 'MODAL_FEATURE':
      return {
        ...state,
        modalFeature: action.item
      }
    case 'CHANGE_STORE_FEATURE':
      const index2 = state.stores.findIndex(
        (item) => item.id == action.storesId
      )
      state.stores[index2].features = action.item;
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default reducer;