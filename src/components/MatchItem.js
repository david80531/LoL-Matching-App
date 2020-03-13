import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, TouchableOpacity, TouchableHighlight} from 'react-native';

import {connect} from 'react-redux';

import moment from 'moment';
import {ListItem, Icon} from 'native-base';
import {Container, Content, List, Thumbnail, Body, Left} from 'native-base';
import {chatRoomInit} from '../states/chat-actions.js';

import CommentList from './CommentList';

import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';

class MatchItem extends React.Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
        championId: PropTypes.number.isRequired,
        championLevel: PropTypes.number.isRequired,
        championName: PropTypes.string.isRequired,
        tier: PropTypes.string.isRequired,
        rank: PropTypes.string.isRequired,
        winRate: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.handleChat = this.handleChat.bind(this);
    }

    handleChat() {
      const {dispatch, userId, championName, navigate} = this.props;

      dispatch(chatRoomInit(userId, championName));
      navigate('ChatRoom');
    }

    state = {
      activeSection: false,
      collapsed: true,
    };

    _toggleExpanded = () => {
      this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const {userId, championId, championLevel, championName, tier, rank, winRate, navigate} = this.props;
        const championImgUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'+championName+'.png';

        return (

            <View style={styles.container}>
              <TouchableHighlight onPress={this._toggleExpanded}>
                <View style={styles.header}>
                  <ListItem  style={StyleSheet.flatten(styles.listItem)} onPress={this._toggleExpanded}>
                      <View style={styles.match}>
                          <View style={styles.championImg}>
                            <Thumbnail large source={{uri:`${championImgUrl}` }} />
                          </View>
                          <View style={styles.wrap}>
                              <Text style={styles.ts}>{userId}</Text>
                              <Text style={styles.text}>{tier}</Text>
                              <Text style={styles.text}>Mastery Level: {championLevel}</Text>
                              <Text style={styles.text}>Win Rate: {winRate}</Text>
                          </View>
                          <View style={styles.matchButton}>
                              <TouchableOpacity style={styles.button} onPress={this.handleChat}>
                                <Text style={styles.buttonText}>Match now!</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </ListItem>
                </View>
              </TouchableHighlight>
              <Collapsible collapsed={this.state.collapsed} align="center">
                <View style={styles.content}>
                  <CommentList vieweeId={userId} navigate={navigate}>
                  </CommentList>
                </View>
              </Collapsible>
            </View>

        );
    }
}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 0,
        backgroundColor: '#fcfaf2',
        //borderRadius: 4,
        borderWidth: 1,
        borderRadius: 7,
        shadowColor: '#434343',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    match: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    championImg: {
        width: 75,
        marginLeft: 12,
        marginRight: 12,
        top: 20,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10
    },
    wrap: {
        flex: 1
    },
    ts: {
        fontSize: 20,
        color: '#434343'
    },
    text: {
        flexDirection: 'row',
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: '#434343',
        marginTop: 4,
        marginBottom: 4,
    },
    matchButton: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
      margin: 5,
      marginTop: 40,
      marginLeft: 7,
      padding: 3,
      paddingLeft: 2,
      paddingRight: 2,
      backgroundColor: '#FF0000',
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      padding: 3,
      fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
      fontWeight: 'bold',
      color: 'white'
    },
    content: {
      flex: 1,
      padding: 20,
      backgroundColor: '#434343'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#434343',
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: '300',
      marginBottom: 20,
    },
    header: {
      backgroundColor: '#434343',
      padding: 10,
    },
    headerText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
    },
    active: {
      backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
      backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selector: {
      backgroundColor: '#F5FCFF',
      padding: 10,
    },
    activeSelector: {
      fontWeight: 'bold',
    },
    selectTitle: {
      fontSize: 14,
      fontWeight: '500',
      padding: 10,
    }
});

export default connect(states =>({

}))(MatchItem);
