import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import Beers from "./container/beers";
import Beer from "./container/beers/detail";

export default AppNavigator = StackNavigator({
    Beers: { screen: Beers, navigationOptions: { title: "Cervejas", header: null } },
    Beer: { screen: Beer, navigationOptions: { title: "Cerveja", header: null } },
});