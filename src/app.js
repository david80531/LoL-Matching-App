import React from 'react';
import {BackHandler} from 'react-native';
import {StyleProvider} from 'native-base';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import {Provider, connect} from 'react-redux';

import {loginForm} from './states/login-reducers.js';
import {user} from './states/user-reducers.js';
import {allMessages} from './states/user-reducers.js';
import {inform} from './states/inform-reducers.js';
import {match} from './states/match-reducers.js';
import {chatroom} from './states/chat-reducers.js';
import {searchPage} from './states/searchPage-reducers.js';
import {searchResult} from './states/searchResult-reducers.js';
import LoginScreen from './components/LoginScreen.js';
import ChatRoomScreen from './components/ChatRoomScreen.js';
import UserScreen from './components/UserScreen.js';
import InformCenterScreen from './components/InformCenterScreen.js';
import MatchScreen from './components/MatchScreen.js';
import SearchPage from './components/SearchPage.js';
import SearchResult from './components/SearchResult.js';


import {StackNavigator, NavigationActions, addNavigationHelpers} from 'react-navigation';

const AppNavigator = StackNavigator({
    Login: {screen: LoginScreen},
    User: {screen: UserScreen},
    ChatRoom: {screen: ChatRoomScreen},
    Information: {screen: InformCenterScreen},
    Match: {screen: MatchScreen},
    SearchPage:{screen: SearchPage},
    SearchResult:{screen: SearchResult}

}, {
    headerMode: 'none'
});

class AppWithStyleAndNav extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}/>
            </StyleProvider>
        );
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {dispatch, nav} = this.props;
            if (nav.index === 0)
                return false;
            dispatch(NavigationActions.back())
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress');
    }
}

const AppWithNavState = connect(state =>({
    nav: state.nav
}))(AppWithStyleAndNav);

// nav reducers

const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: 'Login'}));
const nav = (state = initialState, action) =>{
    const nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

//create redux store

const store = createStore(combineReducers({
    nav, loginForm, user
    , allMessages, inform, match
    , chatroom, searchPage, searchResult
}), compose(applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavState/>
            </Provider>
        );
    }
}
