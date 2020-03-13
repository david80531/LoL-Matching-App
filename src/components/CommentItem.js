import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform, TouchableOpacity, TouchableHighlight} from 'react-native';
import {ListItem,
        Icon,
        Container,
        Content,
        List,
        Thumbnail,
        Body,
        Left} from 'native-base';

export default class CommentItem extends React.Component {
  static PropTypes={
      id:PropTypes.number,
      reviewer: PropTypes.string,
      championName: PropTypes.number,
      text: PropTypes.string
  }
  constructor (props){
      super(props);
  }

  render(){
    const {id, reviewer, championName, text} = this.props;

    const championImgUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'+championName+'.png';

    return(
        <View style={styles.container}>
          <ListItem  style={StyleSheet.flatten(styles.listItem)} >
              <View style={styles.match}>
                  <View style={styles.championImg}>
                    <Thumbnail size={150} source={{uri:`${championImgUrl}` }} />
                  </View>
                  <View style={styles.wrap}>
                    <Text style={styles.ts}>{reviewer}</Text>
                  </View>
                  <View style={styles.wrap}>
                    <Text style={styles.ts}>{text}</Text>
                  </View>
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
        marginLeft: 0,
        backgroundColor: '#434343',
        //borderRadius: 4,
        borderWidth: 1,
    },
    championImg: {
        width: 75,
        marginLeft: 12,
        marginRight: 12,
        top: 3,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10
    },
    wrap: {
        flex: 1
    },
    ts: {
        fontSize: 20,
        color: 'white'
    },
    text: {
        flexDirection: 'row',
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: '#434343',
        marginTop: 4,
        marginBottom: 4,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#434343',
    },
    match: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    }
});
