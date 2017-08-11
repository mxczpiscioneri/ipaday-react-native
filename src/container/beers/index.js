import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, List, ListItem, Text, Thumbnail, Spinner } from 'native-base';
import { connect } from 'react-redux';
import Config from 'react-native-config';

import { allBeers } from './actions'

class Beers extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.allBeers();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header style={{ backgroundColor: '#f94840' }} androidStatusBarColor='#f83830'>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Cervejas</Title>
          </Body>
        </Header>
        <Content>
          {this.props.loading ? (
            <Spinner />
          ) : (
            <List style={{ backgroundColor: '#FFF' }} 
              dataArray={this.props.beers}
              renderRow={(item) =>
                <ListItem onPress={() => navigate('Beer', { beerId: item._id })}>
                  <Thumbnail square large source={{ uri: `${Config.URL_S3}/${item.image}` }} />
                  <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.style}</Text>
                    <Text note>{item.brewery}</Text>
                  </Body>
                </ListItem>
              }>
            </List>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return (
    {
      beers: state.BeersReducer.beers,
      loading: state.BeersReducer.loading,
    }
  )
}

export default connect(mapStateToProps, { allBeers })(Beers)