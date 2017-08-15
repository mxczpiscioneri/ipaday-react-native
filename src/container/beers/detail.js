import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Right, Body, Button, Icon, Title, Content, Text, Card, CardItem, Spinner } from 'native-base';
import { connect } from 'react-redux';
import Config from 'react-native-config';

import { getBeer } from './actions'

class Beers extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    let beerId = params || {};
    beerId = beerId.beerId || '';
    this.props.getBeer(beerId);
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#f94840' }} androidStatusBarColor='#f83830'>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack(null)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Cerveja</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: '#fff' }}>
          {this.props.loading ? (
            <Spinner />
          ) : (
            <Card>
              <CardItem cardBody style={{ alignSelf: 'center', marginTop: 16 }}>
                <Image source={{uri: `${Config.URL_S3}/${this.props.beer.image}`}} style={{height: 250, width: 250}}/>
              </CardItem>
              <CardItem style={{ marginTop: 8 }}>
                <Body>
                  <Text>{this.props.beer.name}</Text>
                  <Text>{this.props.beer.style}</Text>
                  <Text>{this.props.beer.brewery} ({this.props.beer.city})</Text>
                  <Text>{this.props.beer.details}</Text>
                </Body>
              </CardItem>
              <CardItem style={{ marginTop: 8 }}>
                <Left>
                  <Text>ABV:</Text>
                  <Text>{this.props.beer.ABV}</Text>
                </Left>
                <Body>
                  <Text>IBU:</Text>
                  <Text>{this.props.beer.IBU}</Text>
                </Body>
                <Right>
                  <Text>{this.props.beer.year}</Text>
                </Right>
              </CardItem>
            </Card>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return (
    {
      beer: state.BeersReducer.beer,
      loading: state.BeersReducer.loading,
    }
  )
}

export default connect(mapStateToProps, { getBeer })(Beers)