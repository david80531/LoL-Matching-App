import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    ListView,
    StyleSheet,
    Image
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import PercentageCircle from 'react-native-percentage-circle';
import {input,getUserInfo} from '../states/searchResult-actions';
import {Button,Grid,Col, Icon,Thumbnail,Input,Item} from 'native-base';
import NavigationContainer from './NavigationContainer';
import {getSearchIcon} from '../utilities/searchicon.js';
import dismissKeyboard from 'react-native-dismiss-keyboard';

import {connect} from 'react-redux';

class SearchResult extends React.Component {
    static propTypes = {
        navigation: PropTypes.object,
        championId: PropTypes.number,
        championLevel: PropTypes.number,
        tier: PropTypes.string,
        rank: PropTypes.string,
        inputValue: PropTypes.string,
        dispatch: PropTypes.func
    };
    componentDidMount(){
        this.props.dispatch(getUserInfo(this.props.inputValue));
        dismissKeyboard();
    }
    constructor(props) {
        super(props);
        this.handleClear = this.handleClear.bind(this);
        dismissKeyboard()
    }

    render() {
        const {championName, championLevel, rank, tier, championId, winRate} = this.props.searchResult;
        const {inputValue} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.mask}>
              <View style = {styles.top}>
              </View>
              <View style = {styles.form}>
                <Item rounded style={{backgroundColor: 'white', width:310 ,height:40}}>
                    {getSearchIcon({size: 23,style: styles.drawerIcon})}
                    <Input autoFocus placeholder='Search'
                        defaultValue = {inputValue}
                        onEndEditing={this.handleSearch}/>
                    <Icon name = 'close'
                        onPress = {this.handleClear}/>
                </Item>
              </View>
              <View style = {styles.middle}>
              </View>
              <View style={styles.userName_block}>
                <Grid>
                    <Col style={styles.userName}>
                      <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'+championName+'.png'}} style={{width:150,height:150}}>
                      </Image>
                    </Col>
                    <Col style={styles.userName}>
                      <Text style= {{fontSize: 60 ,color :'white'}}>{`${winRate}%`}</Text>
                      <Text style= {{fontSize: 15 ,color :'white'}}>WinRate</Text>
                    </Col>
                </Grid>
              </View>
              <View style = {styles.bottom}>
                 <Grid>
                   <Col style={styles.info_left}>
                     <Text style= {{fontSize: 60 ,color :'white'}}>{`${inputValue}`}</Text>
                   </Col>
                   <Col style={styles.info_right}>
                     <Text style= {{fontSize: 75 ,color :'white'}}>{`${championLevel}`}</Text>
                     <Text style= {{fontSize: 15 ,color :'white'}}>Mastery Level</Text>
                   </Col>
                 </Grid>
              </View>
              <View style = {styles.bottom}>
                 <Grid>
                   <Col style = {styles.info_left}>
                   </Col>
                   <Col style={styles.info_right}>
                     <Image style={{width: 100, height: 100}} source={{uri: tier.toLowerCase()+'_'+rank.toLowerCase()}}></Image>
                     <Text style= {{fontSize: 15,color :'white'}}>{`${tier} ${rank}`}</Text>
                   </Col>
                 </Grid>
              </View>
            </View>
        );
    }
    handleClear() {
        this.props.dispatch(input(''));
        const {goBack} = this.props.navigation;
        goBack();
    }
}
const styles = StyleSheet.create({
  info_left: {
    marginLeft:25,
    backgroundColor:'transparent',
  },
  info_right: {
    marginLeft: 28,
    borderWidth:0,
    backgroundColor:'transparent',
  },
  block_winRate:{
    marginLeft: 28,
    height: 120,
    width: 370,
    backgroundColor:'transparent'
  },
  userName:{
    marginLeft: 25,
    marginBottom : 5,
    borderColor:'white',
    height: 150,
    backgroundColor:'transparent',
  },
  userName_block:{
    height: 150,
    width: 370,
    backgroundColor:'transparent',
  },
  top:{
    height: 10,
  },
  background:{
    height:520
  },
  mask:{
    height:600,
    backgroundColor:'black'
  },
  middle:{
    height:30,
    width:370
  },
  bottom:{
    width: 370,
    height: 150
  },
  block:{
    width: 370,
    height: 150
  },
  form:{
    width : 370,
    alignItems:'center',
    justifyContent:'center'
  }

});

export default connect(state => ({
  inputValue: state.searchPage.inputValue,
  searchResult: state.searchResult
}))(SearchResult);
