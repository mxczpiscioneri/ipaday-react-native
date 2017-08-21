import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Right, Body, Button, Icon, Title, Content, Text, Card, CardItem, Spinner } from 'native-base';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';

class Beers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#f94840' }} androidStatusBarColor='#f83830'>
          <Body>
            <Title>Login</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: '#fff' }}>
          <LoginButton
            readPermissions={["public_profile"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("Login failed with error: " + result.error);
                } else if (result.isCancelled) {
                  alert("Login was cancelled");
                } else {
                  const { navigate } = this.props.navigation;
                  
                  AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      console.log(data);
                      navigate("Beers");
                    }
                  );
                }
              }
            }
            onLogoutFinished={() => alert("User logged out")}/>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return (
    {
    }
  )
}

export default connect(mapStateToProps, {  })(Beers)