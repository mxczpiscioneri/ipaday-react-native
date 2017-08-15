import React, { Component } from 'react';
import { View, Image } from "react-native";
import { Button, Text, Container, List, ListItem, Content, Icon } from "native-base";

const routes = [{title:"Cervejas", screen:"Beers"}, {title:"Cerveja", screen:"Beer"}];
const LOGO = require('../images/logo.jpg');

export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={{ height: 240, justifyContent: "center", alignItems: "center", backgroundColor: '#f94840' }} >
            <Image square style={{ height: 200, width: 200 }} source={LOGO} />
          </View>
          <List dataArray={routes} 
            renderRow={data => {
              return (
                <ListItem button onPress={() => this.props.navigation.navigate(data.screen)}>
                  <Text>{data.title}</Text>
                </ListItem>
              );
            }} />
        </Content>
      </Container>
    );
  }
}