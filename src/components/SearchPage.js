import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    StyleSheet,
    Image,
} from 'react-native';
import {Container, Content, InputGroup, Input, Item, Grid, Col, Button, TextInput} from 'native-base';
import {input} from '../states/searchPage-actions';
import NavigationContainer from './NavigationContainer';
import {getSearchIcon} from '../utilities/searchicon.js';

import {connect} from 'react-redux';

class SearchPage extends React.Component{
  static propTypes = {
    navigate: PropTypes.func,
    inputValue :PropTypes.string.isRequired,
    dispatch: PropTypes.func
  };
  constructor(props) {
      super(props);
      this.handleSearch = this.handleSearch.bind(this);
  }
  render(){
    const {inputValue} = this.props;
    const {navigate} = this.props.navigation;
    return(
     <NavigationContainer navigate={navigate} title='LoL-Matching'>
      <Container>
          <Content style = {{backgroundColor : "#FFB11B"}}>
              <View style = {styles.top}>
              </View>
              <View style = {styles.image}>
                <Grid>
                  <Col style = {styles.image}>
                    <Image style={{width: 200, height: 200}} source={require('../images/find.png')}></Image>
                    <Text>Find someone </Text>
                    <Text>You are interested with </Text>
                  </Col>
                </Grid>
              </View>
              <View style = {styles.middle}>
              </View>
              <View style = {styles.form}>
                <Item rounded style={{backgroundColor: 'white', width:300}}>
                    {getSearchIcon({size: 23,style: styles.drawerIcon})}
                    <Input autoFocus placeholder='Search'
                        defaultValue = {inputValue}
                        onEndEditing={this.handleSearch}/>
                </Item>
              </View>
             </Content>
      </Container>
    </NavigationContainer>
    );
  }
  handleSearch(e){
      if(!e.nativeEvent.text){
          return;
      }

      this.props.dispatch(input(e.nativeEvent.text));
      const {navigate} = this.props.navigation;
      navigate('SearchResult');
  }
}
const styles = StyleSheet.create({
  image:{
    height:180,
    width:370,
    alignItems:'center',
    justifyContent:'center'
  },
  top:{
    height:120,
    width: 370
  },
  form:{
    width : 370,
    alignItems:'center',
    justifyContent:'center'
  },
  middle:{
    height:50,
    width: 370
  },
  profileIcon:{
    height:150,
    width:370
  }
});

export default connect(state => ({
    inputValue: state.searchPage.inputValue
}))(SearchPage);
