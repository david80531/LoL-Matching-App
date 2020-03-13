import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Icon, Header, Left, Right, Body, Title} from 'native-base';
import {ISendMsg} from '../states/user-actions.js';

class ChatRoomScreen extends React.Component {
  static propTypes = {
      userName: PropTypes.string,
      championName: PropTypes.string
  }


  constructor(props) {
    super(props);
    this.state = { messages: []};
    this.onSend = this.onSend.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.changeState = this.changeState.bind(this);

    this.listen();
  }

  listen() {
      const {socket} = this.props;
      socket.on('change_state', this.changeState);
  }

  changeState(messages){
      console.log('IN change State');
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messages.msg),
        };
      });
  }

  onSend(messages = []) {
    const {userName, socket, championName, chatingName, dispatch} = this.props;

    socket.emit('send_message', {
        msg: messages[0],
        userName: userName,
        championName: championName,
        partnerName: chatingName
    });

    dispatch(ISendMsg(messages));

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

  }

  componentDidMount(){
      const {UsersAndMessages, idx} = this.props;
      this.setState({
              messages: UsersAndMessages[idx].msg
          },() => {
             console.log('In Did Mount');
             console.log(this.state.messages);
          });
  }

  componentWillReceieveProps(nextProps){

  }

  handleLeave(){
      const {goBack} = this.props.navigation;
      goBack();
  }

  render() {
    const {chatingName} = this.props;

    return (
        <View style={styles.container}>
            <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={this.handleLeave}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{`${chatingName}`}</Title>
                        </Body>
                    </Header>
                </Container>
            <View style={styles.giftedChat}>
                <GiftedChat messages={this.state.messages} onSend={this.onSend} user={{  _id: 1}}/>
            </View>
        </View>
    );
  }
}

const styles = {
    container:{
        flex: 1
    },
    giftedChat:{
        flex: 8
    }
};

export default connect(state => ({
    userName: state.loginForm.userName,
    championName: state.user.championName,
    chatingChampionName: state.chatroom.chatingChampionName,
    chatingName:state.chatroom.chatingName,
    idx: state.chatroom.idx,
    socket: state.loginForm.socket,
    UsersAndMessages: state.allMessages.UsersAndMessages
}))(ChatRoomScreen);
