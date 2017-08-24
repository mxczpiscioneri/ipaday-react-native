import { ToastAndroid } from 'react-native';

import api from '../../utils/api';
import { FIND_BEERS, GET_BEER, SHOW_LOADING } from '../../types';

export const allBeers = () => {
  return dispatch => {
    api.get(`/beers`)
      .then(async (response) => {
        const beers = response.data.data;
        dispatch({ type: FIND_BEERS, payload: beers });
        dispatch({ type: SHOW_LOADING, payload: false });
      })
      .catch(error => {
        dispatch({ type: SHOW_LOADING, payload: false });
        ToastAndroid.show('Erro ao carregar as cervejas. ', ToastAndroid.LONG);
        console.log("Erro allBeers: ", error);
      });
  }
}

export const getBeer = (beerId) => {
  return dispatch => {
    dispatch({ type: SHOW_LOADING, payload: true });
    api.get(`/beers/view/${beerId}`)
      .then(async (response) => {
        const beer = response.data.data;
        dispatch({ type: GET_BEER, payload: beer });
        dispatch({ type: SHOW_LOADING, payload: false });
      })
      .catch(error => {
        ToastAndroid.show('Erro ao carregar cerveja. ', ToastAndroid.LONG);
        console.log("Erro getBeer: ", error);
      });
  }
}