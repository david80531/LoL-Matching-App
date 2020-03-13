import React from 'react';
import {View,
  StyleSheet, Text, Platform,
  TouchableOpacity, TouchableHighlight,
  ListView, RefreshControl, ScrollView} from 'react-native';
import { Container, Content, InputGroup, Input, Icon ,Item} from 'native-base';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import {connect} from 'react-redux';

import {getCommentFromApi, createCommentFromApi} from '../api/comment.js';

class CommentList extends React.Component {
  static propTypes = {
        vieweeId:PropTypes.string,
        reviewerId: PropTypes.string,
        inputValue: PropTypes.string
  };

  constructor(props){
      super(props);
      this.state = {
          input:'',
          comments: []
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleAddComment = this.handleAddComment.bind(this);

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = { dataSource: ds.cloneWithRows(this.state.comments), };
  }

  componentDidMount(){
    getCommentFromApi(this.props.vieweeId).then(data => {
        this.setState({
            comments: data
        })
    });
  }

  handleInputChange(e){
    const text = e.target.value;
    const inputValue = e.nativeEvent.text;
    this.setState({
        input: inputValue
      });
  }

  handleAddComment(){
    if(!this.state.input){
        return;
    }

    const {reviewerId} = this.props;

    createCommentFromApi(reviewerId, this.props.vieweeId, this.state.input).then(data =>{
        getCommentFromApi(this.props.vieweeId).then(data => {
            this.setState({
                comments: data,
                input: ''
            })
        }).catch(err =>{
            console.log('Listing Comment Error!');
            console.log(err);
        })
    }).catch(err =>{
        console.log('Create Comment Failed!')
        console.log(err);
    });

    this.props.navigate('Match');
  }

  render() {
      const vieweeId = this.props.vieweeId;
      const inputValue = this.props.inputValue;

      let children = (
          <View style = {styles.container}>
            <Text style = {styles.text}>There isn't any comment yet!</Text>
          </View>
      );


      if(this.state.comments){
        if(this.state.comments.length) {
            children = (
                /*
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(p) => {
                    return <CommentItem {...p} />;
                  }}
                />
                */
                this.state.comments.map(p => (
                    <ScrollView　key={p.id}>
                        <CommentItem {...p} />
                    </ScrollView>
                ))
            );
        }
      }

      return(
        <View style = {styles.container}>
          {children}
          <View style = {styles.input}>
            <Item rounded style={{backgroundColor:'#fcfaf2', marginBottom: 7}} >
              <Input placeholder='Give your comment here'
                value={inputValue} onChange={this.handleInputChange}/>
            </Item>
            <TouchableOpacity style={styles.button} onPress={this.handleAddComment}>
              <Text style={styles.buttonText}>Add Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
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
    input: {
      marginTop: 10,
    },
    button: {
      margin: 5,
      padding: 3,
      paddingLeft: 2,
      paddingRight: 2,
      backgroundColor: '#FFB266',
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      padding: 3,
      fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
      fontWeight: 'bold'
    }
});

export default connect(state =>({
    reviewerId: state.loginForm.userName
}))(CommentList);
