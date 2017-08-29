import { ToastAndroid, AsyncStorage } from 'react-native';

import api from '../../utils/api';
import firebase from '../../utils/firebase';
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

export const setRating = (beerId, rating, comment) => {
  return async dispatch => {
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      user = user || {};

      let listRatings = [];
      firebase.database()
        .ref(user.uid)
        .once('value', (snap) => {
          listRatings = snap.val();
          listRatings = listRatings || {};
          listRatings = listRatings.ratings || [];
          listRatings.push({beerId, rating, comment});

          firebase.database()
            .ref(user.uid)
            .set({
              ratings: listRatings
            });

          ToastAndroid.show("Avaliação realizada com suceso!", ToastAndroid.LONG)
        });
  }
}