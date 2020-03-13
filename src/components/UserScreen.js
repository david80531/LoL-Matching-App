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
import {getUserInfo} from '../states/user-actions';
import {receiveMessages} from '../states/user-actions';
import {getInform, clearInfo} from '../states/inform-actions.js';
import {Button,Grid,Col,Thumbnail} from 'native-base';
import NavigationContainer from './NavigationContainer';
import {AsyncStorage} from 'react-native';
import {setMessage} from '../states/user-actions.js';
import {connect} from 'react-redux';

class UserScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        //userData: PropTypes.object,
        //userName: PropTypes.string,
        dispatch: PropTypes.func
    };
    constructor(props) {
        super(props);
        const {socket} = this.props.socket;
        this.onReceive = this.onReceive.bind(this);
        this.listen();
    }
    componentDidMount(){
        const {userName, dispatch} = this.props;


        dispatch(getUserInfo(userName));
    }

    componentWillUnmount(){
        const {dispatch, UsersAndMessages} = this.props;

    }

    listen() {
        const {socket} = this.props;
        socket.on('rec_message', this.onReceive);
    }

    onReceive(messages){
        const {dispatch, chatingName} = this.props;

        dispatch(receiveMessages(messages));
        dispatch(getInform({
            partnerName: messages.partnerName,
            championName: messages.championName
        }));

        if(chatingName !== messages.partnerName){
            var PushNotification = require('react-native-push-notification');
            const notiText = 'You have new messages by ' + messages.partnerName;

            PushNotification.localNotificationSchedule({
                message: notiText, // (required)
                date: new Date(Date.now() + 1000) // in 60 secs
            });
        }
    }

    render() {
        const {userId ,championName, championLevel, rank, tier, masking, championId, winRate} = this.props.userData;
        const {navigate} = this.props.navigation;

        return (
            <NavigationContainer navigate={navigate} title='User Profile'>
              <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+championName+'_0.jpg'}} style={styles.background}>
                <View style={styles.mask}>
                  <View style={styles.top}>
                  </View>
                  <View style={styles.image}>
                      <Image source={{uri: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'+championName+'.png'}} style={styles.profileIcon}/>
                  </View>
                  <View style={styles.userName}>
                    <Grid>
                     <Col style={styles.userName}>
                      <Text style= {{fontSize: 40,color:'white'}}>{`${this.props.userName}`}</Text>
                     </Col>
                    </Grid>
                  </View>
                  <View style={styles.block}>
                     <Grid>
                       <Col style={styles.info}>
                         <Image style={{width: 90, height: 90}} source={{uri: tier.toLowerCase()+'_'+rank.toLowerCase()}}></Image>
                         <Text style= {{fontSize: 15, color: 'white'}}>{`${tier} ${rank}`}</Text>
                       </Col>
                       <Col style={styles.info}>
                         <PercentageCircle radius={45} innerColor={'rgba(0,0,0,0.7)'} percent={`${winRate}`} bgcolor={'transparent'} color={'white'} borderWidth={3}>
                           <Text style= {{fontSize: 20, color: 'white'}}>{`${winRate}%`}</Text>
                         </PercentageCircle>
                         <Text style= {{fontSize: 15, color: 'white'}}>WinRate</Text>
                       </Col>
                       <Col style={styles.info}>
                         <Text style= {{fontSize: 60, color: 'white'}}>{`${championLevel}`}</Text>
                         <Text style= {{fontSize: 15, color: 'white'}}>Mastery Level</Text>
                       </Col>
                     </Grid>
                  </View>
                 </View>
                </Image>
            </NavigationContainer>
        );
    }
}
const styles = StyleSheet.create({
    image: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:'white',
      borderWidth:0,
      backgroundColor:'transparent',
      height: 160,
      borderRadius: 0,
      width: 370,
    },
    info: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:'white',
      borderWidth:0,
      backgroundColor:'transparent',
    },
    block:{
      borderColor:'#FCFAF2',
      height: 200,
      borderRadius: 0,
      width: 370,
      backgroundColor:'transparent'
    },
    userName:{
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:'#FCFAF2',
      height: 80,
      borderRadius: 0,
      width: 370,
      backgroundColor:'transparent',
    },
    top:{
      height: 70,
      width: 370,
      backgroundColor:'transparent',
    },
    profileIcon:{
      height: 160,
      borderRadius: 80,
      borderWidth:2,
      width: 160,
    },
    background:{
      height:520
    },
    mask:{
      height:520,
      backgroundColor:'rgba(0,0,0,0.7)'
    }

});

export default connect(state => ({
    userData: state.user,
    userName: state.loginForm.userName,
    socket: state.loginForm.socket,
    chatingName: state.chatroom.chatingName,
    UsersAndMessages: state.allMessages.UsersAndMessages
}))(UserScreen);
