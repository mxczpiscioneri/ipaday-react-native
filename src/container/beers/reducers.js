import { FIND_BEERS, GET_BEER, SHOW_LOADING } from '../../types';

const INITIAL_STATE = {
  beers: [],
  beer: [],
  loading: true 
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIND_BEERS:
      return { ...state, beers: action.payload };
    case GET_BEER:
      return { ...state, beer: action.payload };
    case SHOW_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state
  }
}