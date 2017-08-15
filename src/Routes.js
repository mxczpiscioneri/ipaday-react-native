import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { DrawerNavigator } from "react-navigation";

import SideBar from "./components/sidebar";
import Beers from "./container/beers";
import Beer from "./container/beers/detail";

export default AppNavigator = DrawerNavigator ({
    Beers: { screen: Beers, navigationOptions: { title: "Cervejas", header: null } },
    Beer: { screen: Beer, navigationOptions: { title: "Cerveja", header: null } },
},
{
  initialRouteName: 'Beers',
  contentComponent: props => <SideBar {...props} />,
  contentOptions: { activeTintColor: '#f94840', style: { backgroundColor: 'black', flex: 1 } }
});