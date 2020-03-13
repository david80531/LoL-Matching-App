//import {loginApi, logoutApi} from 'api/login.js';
import SocketIOClient from 'socket.io-client';

export function inputUser(userName){
    return {
        type: '@LOGIN_FORM/INPUT_USER',
        userName
    };
}

export function inputPassword(password){
    return{
        type: '@LOGIN_FORM/INPUT_PASSWORD',
        password
    };
}

export function setInputDanger (bool){
    return {
        type: '@LOGIN_FORM/SET_INPUT_DANGER',
        bool
    };
}
export function loginSuccess(userName, password){
    return {
        type: '@LOGIN_FORM/LOGIN_SUCCESS',
        userName,
        password,
        socket: SocketIOClient('http://140.114.86.102:3000')
    };
}

function loginFailed(){
    return{
        type: '@/LOGIN_FORM/LOGIN_FAIL'
    };
}


//server1:http://140.114.86.102:3000
//server2:http://140.114.194.149:3000
