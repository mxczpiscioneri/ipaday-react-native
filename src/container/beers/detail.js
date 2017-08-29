import React, { Component } from 'react';
import { StyleSheet, Image, Modal, View } from 'react-native';
import { Container, Header, Left, Right, Body, Button, Icon, Title, Content, Text, Badge, Spinner, Form, Item, Label, Input } from 'native-base';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import StarRating from 'react-native-star-rating';

import { getBeer, setRating } from './actions'

class Beers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      modalVisible: false,
      comment: ''
    };
  }
  
    componentWillMount() {
      const { params } = this.props.navigation.state;
      let beerId = params || {};
      beerId = beerId.beerId;
      this.props.getBeer(beerId);
    }
    
    _send() {
      const { params } = this.props.navigation.state;
      let beerId = params || {};
      beerId = beerId.beerId || '';
      this.props.setRating(beerId, this.state.rating, this.state.comment)

      this.setState({ modalVisible: false });
    }
    
    _setRating(rating) {
      this.setState({ rating: rating });
      this.setState({ modalVisible: true })
    }

    _closeModal() {
      this.setState({ modalVisible: false })
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
            <View style={{ paddingHorizontal: 16 }}>
              <View style={{ alignSelf: 'center', marginTop: 16 }}>
                <Image source={{uri: `${Config.URL_S3}/${this.props.beer.image}`}} style={{height: 250, width: 250}}/>
              </View>
              <Badge style={{backgroundColor: "#fdbe17"}}>
                <Text>{this.props.beer.year}</Text>
              </Badge>
              <View style={{ marginTop: 8 }}>
                <View style={{ alignSelf: 'center' }}>
                  <Text style={styles.title}>{this.props.beer.name}</Text>
                  <Text style={styles.text}>{this.props.beer.style}</Text>
                  <Text style={styles.text}>{this.props.beer.brewery} ({this.props.beer.city})</Text>
                </View>
                <Text style={styles.text}>{this.props.beer.details}</Text>
              </View>
              <View style={{ marginTop: 24, flexDirection: 'row' }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.details}>ABV: {this.props.beer.ABV}</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.details}>IBU: {this.props.beer.IBU}</Text>
                </View>
              </View>
              <View style={{ marginTop: 24, flexDirection: 'row' }}>
                <Text style={[ styles.text, {flex: 1, marginTop: 8}]}>Avalie essa cerveja!</Text>
                <StarRating
                  emptyStar={'ios-beer-outline'}
                  fullStar={'ios-beer'}
                  halfStar={'ios-beer'}
                  iconSet={'Ionicons'}
                  starStyle={{marginHorizontal: 5, flex: 1}}
                  maxStars={5}
                  rating={this.state.rating}
                  selectedStar={(rating) => this._setRating(rating)}
                  starColor={'#f94840'}
                />
              </View>
            </View>            
          )}          
        </Content>
        <Modal
          animationType={"slide"}
          transparent={false}
          onRequestClose={() => false}
          visible={this.state.modalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Avalie essa cerveja!</Text>
              <Form>
                <Item>
                  <Input placeholder="Comentário..." onChangeText={(text) => this.setState({ comment: text })} />
                </Item>
              </Form>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={{ flex: 1, paddingRight: 5 }}>
                  <Button block transparent dark onPress={() => this._closeModal()}>
                    <Text>Cancelar</Text>
                  </Button>
                </View>
                <View style={{ flex: 1, paddingLeft: 5 }}>
                  <Button block transparent dark onPress={() => this._send()}>
                    <Text>Enviar</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  },
  modalBody: {
    backgroundColor: "#FFF",
    padding: 20,
    paddingBottom: 0
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    color: "#404040",
    textAlign: "center"
  },
  text: {
    fontSize: 18,
    color: "#404040",
    textAlign: "center"
  },
  details: {
    color: "#404040"
  },
  center: {
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return (
    {
      beer: state.BeersReducer.beer,
      loading: state.BeersReducer.loading,
    }
  )
}

export default connect(mapStateToProps, { getBeer, setRating })(Beers)