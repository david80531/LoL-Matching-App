import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, Image} from 'react-native';
import {ListItem, Icon, Button, Thumbnail} from 'native-base';
import {clearInfoNum} from '../states/inform-actions.js';
import {chatRoomInit} from '../states/chat-actions.js';
import {connect} from 'react-redux';

class InformItem extends React.Component {
    static propTypes = {
        partnerName: PropTypes.string,
        championName: PropTypes.string,
        navigate: PropTypes.func,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state={textToggle:false};
        //this.handleNav = this.handleNav.bind(this);
        this.handleDecline = this.handleDecline.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
    }
    handleAccept () {
        const {dispatch, navigate, partnerName, championName} = this.props;
        dispatch(chatRoomInit(partnerName, championName));
        navigate('ChatRoom');
    }

    handleDecline(){
        console.log('handleDecline');
        console.log(this.state.textToggle);
        this.setState({
            textToggle: true
        }, () => {
        console.log(this.state.textToggle);
        });

    }


    render() {
        const {partnerName, championName} = this.props;
        const {textToggle} = this.state;
        const championImgUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'+championName+'.png';
        console.log('In InformItem');
        console.log(championName);

        return (
            <View style={{height: 100}}>
                <ListItem style={StyleSheet.flatten(styles.listItem)}>
                    <View style={styles.inform}>
                        <View style={styles.image}>
                          <Thumbnail large source={{uri:`${championImgUrl}` }} />
                        </View>
                        <View style={styles.textAndButton}>
                        { textToggle ?
                            <View>
                                <Text style={{color:'#434343', fontSize:21, alignItems: 'center', marginTop: 18, marginLeft: 4}}>Request removed</Text>
                            </View>
                            :
                            <View>
                              <Text style={styles.text}>{`new message from ${partnerName}`}</Text>
                                  <View style={styles.button}>
                                        <Button rounded style={{
                                            backgroundColor:'#0084ff',
                                            height:30,
                                            margin: 5
                                          }
                                        }
                                        onPress={this.handleAccept}
                                        >
                                            <Text style={{color: 'white'}}> Accept </Text>
                                        </Button>
                                        <Button rounded style={{
                                          backgroundColor:'#e93f3f',
                                          height:30,
                                          margin: 5
                                          }
                                      } onPress={this.handleDecline}>
                                              <Text style={{color: 'white'}}> Decline </Text>
                                        </Button>
                                  </View>
                                 </View>
                      }</View>
                    </View>
                </ListItem>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 0
    },
    inform: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    image: {
      height: 80,
      borderRadius: 0,
      width: 80,
      margin: 10
    },
    textAndButton:{
        flex: 0.7,
        marginLeft: 10
    },
    button: {
      flexDirection: 'row',
      marginTop: 15
    },
    text:{
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: 'rgb(46, 47, 45)',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 13
    }
})

export default connect (state =>({
    informNum: state.inform.informNum
}))(InformItem);
