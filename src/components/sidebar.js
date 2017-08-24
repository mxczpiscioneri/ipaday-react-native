import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Image, TouchableWithoutFeedback } from "react-native";
import { Text, Container, List, ListItem, Content, Icon } from "native-base";

const routes = [{title:"Cervejas", screen:"Beers"}, {title:"Cerveja", screen:"Beer"}];
const LOGO = require('../images/logo.jpg');

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: ''
    };
  }

  componentWillMount() {
    this._getUser();
  }

  _getUser = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    user = user || {};
    if (user){
      this.setState({name: user.displayName})
      this.setState({email: user.email})
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <View style={{ height: 240, justifyContent: "center", alignItems: "center", backgroundColor: '#f94840' }} >
            <Image square style={{ height: 200, width: 200 }} source={LOGO} />
            <TouchableWithoutFeedback onPress={() => navigate("Login", {Drawer: true})}>
              <View>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.email}>{this.state.email}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <List dataArray={routes} 
            renderRow={data => {
              return (
                <ListItem button onPress={() => navigate(data.screen)}>
                  <Text>{data.title}</Text>
                </ListItem>
              );
            }} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    color: "#FFF",
    fontWeight: "bold",
    alignSelf:'center'
  },
  email: {
    color: "#FFF",
    alignSelf:'center',
    marginBottom: 30,
  },
});