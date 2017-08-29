import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Image } from 'react-native';
import { Container, Header, Left, Body, Button, Icon, Title, Content, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import FBSDK, { FBLoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

import firebase from '../../utils/firebase';

const LOGO = require('../../images/logo-circle.png');
const BACKGROUND = require('../../images/background-login.jpg');

class Beers extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      drawer: false,
      user: null
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const Drawer = params || {};
    this.setState({drawer: Drawer.Drawer});
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
            <Image style={styles.backgroundImage} source={BACKGROUND} >
              <Image square style={styles.logo} source={LOGO} />
              <Text style={styles.title}>IPA DAY</Text>
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
                  await AsyncStorage.removeItem('user');
                }}/>
            </Image>
        </Container>
      )
    );
  }
}

const  styles = StyleSheet.create({
  logo: {
    marginTop: 50,
    height: 200, 
    width: 200
  },
  title: {
    color: "#004226", 
    fontSize: 48,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 60,
  },
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignItems: 'center',
  }
});

const mapStateToProps = state => {
  return (
    {
    }
  )
}

export default connect(mapStateToProps, {  })(Beers)