import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';

import {connect} from 'react-redux';
import {login, inputUser ,inputPassword ,setInputDanger, loginSuccess} from '../states/login-actions.js';
import {Form, Container, Content, Item, Input, Icon, Button } from 'native-base';

class LoginScreen extends React.Component {
    static propTypes = {
        userName: PropTypes.string,
        password: PropTypes.string,
        inputDanger: PropTypes.bool,
        //socket: PropTypes.func,
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.handleuserNameChange = this.handleuserNameChange.bind(this);
        this.handlepasswordChange = this.handlepasswordChange.bind(this);

        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {userName} = this.props;
        const {navigate} = this.props.navigation;

        if(nextProps.socket !== this.props.socket){
            if(nextProps.socket){
                const socket = nextProps.socket;
                socket.emit('login', userName);
                navigate('User');
            }
        }
    }

    handleuserNameChange(e) {
        this.props.dispatch(inputUser( e.nativeEvent.text));
        console.log(this.props.userName);
    }
    handlepasswordChange(e) {
        this.props.dispatch(inputPassword( e.nativeEvent.text));
        console.log(this.props.password);
    }
    handleLogin() {                                       //login

        const {dispatch, userName, password, socket} = this.props;

        if (!this.props.userName) {
            dispatch(setInputDanger(true));
            return;
        }
        if (!this.props.password) {
            dispatch(setInputDanger(true));
            return;
        }
    //    this.props.dispatch(login(this.props.userName, this.props.password));


    dispatch(loginSuccess(userName, password));

    }


    render() {
        const {userName, password} = this.props;


        return (
           <Container style={styles.container}>
               <Content>
                    <Image source={require('../images/lolicon.png')} style={styles.image}>
                    </Image>
                   <Form>
                       <Item rounded style={styles.userNameInput}>
                           <Input placeholder='UserName'
                                onChange={this.handleuserNameChange}
                                value={userName}/>
                       </Item>
                       <Item rounded style={styles.passwordInput}>
                           <Input placeholder='PassWord'
                           onChange={this.handlepasswordChange}
                           value={password}
                           secureTextEntry={true}
                           />
                       </Item>
                     </Form>
                    <Button block rounded onPress={this.handleLogin} style={styles.buttonStyle}>
                        <Text style={{color: 'white', fontSize: 24}}>Login</Text>
                    </Button>
               </Content>
           </Container>
       );

    }

}

const styles = {
    container:{
        backgroundColor: 'rgba(44, 98, 170, 1)'
    },
    image: {
        left: 110,
        top: 70,
        bottom: 500,
        height:137,
        width:137,
        borderRadius: 45
    },
    userNameInput:{
        marginTop: 130,
        marginLeft: 30,
        marginBottom: 10,
        width: 300,
        backgroundColor: 'rgb(241, 236, 236)'
    },
    passwordInput:{
        marginBottom: 32,
        marginLeft: 30,
        width: 300,
        backgroundColor: 'rgb(241, 236, 236)'
    },
    buttonStyle: {
        marginLeft: 55,
        width: 250,
        backgroundColor: '#3A8FB7'
    }
}

export default connect((state) =>({
    userName: state.loginForm.userName,
    password: state.loginForm.password,
    inputDanger: state.loginForm.inputDanger,
    socket: state.loginForm.socket
}))(LoginScreen);
