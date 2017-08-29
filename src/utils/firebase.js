import { AsyncStorage } from 'react-native';
import RNFirebase from 'react-native-firebase';
import Config from 'react-native-config';

_getUser = async () => {
  let user = await AsyncStorage.getItem('user');
  user = JSON.parse(user);
  return user || {};
}

const configFirebase = {
  apiKey: Config.FIREBASE_APIKEY,
  authDomain: Config.FIREBASE_AUTHDOMAIN,
  databaseURL: Config.FIREBASE_DATABASEURL,
  projectId: Config.FIREBASE_PROJECTID,
  storageBucket: Config.FIREBASE_STORAGEBUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGINGSENDERID,
  errorOnMissingPlayServices: true,
  persistence: true
};

const user = _getUser();

const firebase = RNFirebase.initializeApp(configFirebase);
firebase.analytics().setAnalyticsCollectionEnabled(true)
firebase.analytics().setUserProperty('Nome', user.displayName)
firebase.analytics().setUserProperty('Email', user.email)
firebase.analytics().setUserId(user.uid)

export default firebase


