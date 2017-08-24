import React, { Component } from 'react';
import { StyleSheet, AsyncStorage , Image, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Right, Body, Button, Icon, Title, Content, Text, Card, CardItem, Spinner } from 'native-base';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import FBSDK, { FBLoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
import RNFirebase from 'react-native-firebase';

var configFirebase = {
  apiKey: Config.FIREBASE_APIKEY,
  authDomain: Config.FIREBASE_AUTHDOMAIN,
  databaseURL: Config.FIREBASE_DATABASEURL,
  projectId: Config.FIREBASE_PROJECTID,
  storageBucket: Config.FIREBASE_STORAGEBUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGINGSENDERID
};
const firebase = RNFirebase.initializeApp(configFirebase);

class Beers extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      drawer: false,
      user: {}
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const Drawer = params || {};
    this.setState({drawer: Drawer.Drawer});
    if(!Drawer.Drawer) {
      this._getUser();
      console.log("_getUser");
    }
  }
  
  _getUser = async () => {
    const { navigate } = this.props.navigation;
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    user = user || {};
    if (user.token){
      this.setState({user});
      navigate("Beers");
    }
  }

  render() {
    return (
      this.state.user ? (
        <Container>
          <Header style={{ backgroundColor: '#f94840' }} androidStatusBarColor='#f83830'></Header>
          <Content style={{ backgroundColor: '#fff' }}>
            <Spinner />
          </Content>
        </Container>
      ) : (
        <Container>
          <Header style={{ backgroundColor: '#f94840' }} androidStatusBarColor='#f83830'>
            {this.state.drawer ? (
              <Left>
                <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                  <Icon name='menu' />
                </Button>
              </Left>
            ) : (
              null
            )}
            <Body>
              <Title>Login</Title>
            </Body>
          </Header>
          <Content style={{ backgroundColor: '#fff' }}>
            <LoginButton
              readPermissions={["public_profile", "email"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("Login failed with error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("Login was cancelled");
                  } else {
                    const { navigate } = this.props.navigation;
                    AccessToken.getCurrentAccessToken().then((data) => {
                      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                      firebase.auth().signInWithCredential(credential).then(async (result) => {
                        const user = result._user;
                        user.token = credential.token;
                        await AsyncStorage.setItem('user', JSON.stringify(user));
                        navigate("Beers");
                      }, (error) => {
                        console.log(error);
                      });
                    }, (error) => {
                      console.log(error);
                    });
                  }
                }
              }
              onLogoutFinished={async () => {
                this.setState({drawer: false});
                console.log("removeItem");
                await AsyncStorage.removeItem('user');
              }}/>
          </Content>
        </Container>
      )
    );
  }
}

const  styles = StyleSheet.create({
  base: {
    width: 175,
    height: 30,
  },
});

const mapStateToProps = state => {
  return (
    {
    }
  )
}

export default connect(mapStateToProps, {  })(Beers)