import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ListView, RefreshControl,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { Container, Content, Spinner } from 'native-base';

import MatchItem from './MatchItem';

import {connect} from 'react-redux';
import {getMatch} from '../states/match-actions';
import {openMatch} from '../states/match-actions';
import {startLoading} from '../states/match-actions';
import {endLoading} from '../states/match-actions';

import * as Animatable from 'react-native-animatable';

class MatchList extends React.Component {
    static propTypes = {
        userName:PropTypes.string,
        matches: PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired,
        matchToggle: PropTypes.bool,
        loading: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            }),
            refreshing: false
        };

        this.handleMatch = this.handleMatch.bind(this);
    }

    _onRefresh() {
      this.setState({refreshing: true});
      this.props.dispatch(getMatch(this.props.userName)).then(
        () => {
      this.setState({refreshing: false});
      });
    }

    handleMatch() {
        this.props.dispatch(openMatch());
        this.props.dispatch(startLoading());
        this.props.dispatch(getMatch(this.props.userName));
    }

    componentDidMount(){
      this.props.dispatch(startLoading());
      this.props.dispatch(getMatch(this.props.userName));
    }


    componentWillReceiveProps(nextProps) {
        const {userName, dispatch, matches} = this.props;
        if (matches !== nextProps.matches) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.matches)
            });
        }
    }

    render() {
        const {matches, matchToggle, loading, navigate} = this.props;
        let children = (
          <View style = {styles.container}>
            <Text style = {styles.text}>Can't find any match!</Text>
            <Text style = {styles.text}>Please match later.</Text>
          </View>
        );

        if(matches.length) {
          children = (
            <ListView
                style = {{backgroundColor: '#434343'}}
                dataSource={this.state.dataSource}
                renderRow={(p) => {
                    return <MatchItem navigate={navigate} {...p} />;
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh.bind(this)}
                    />
                  }
            />
          );
        }


        return (
            <View style={styles.background}>
              {matchToggle
                ?
                  <View>
                    {loading&&<Spinner />}
                    {children}
                  </View>
                :
                  <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={this.handleMatch}>
                      <Animatable.Text duration = {2000} iterationCount='infinite' style={styles.buttonText} animation="flash">Tap to match now!</Animatable.Text>
                      <Image source={require('../images/partner.png')} style={styles.image} />
                    </TouchableOpacity>
                  </View>
             }
           </View>
        );
    }

}

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#434343',
    flex: 1
  },
  button: {
    //margin: 20,
    //padding: 10,
    //paddingLeft: 20,
    //paddingRight: 20,
    backgroundColor: 'rgba(44, 98, 170, 1)',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(44, 98, 170, 1)',
  },
  text: {
    flexDirection: 'row',
    fontSize: 17,
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
    color: appColors.text,
    marginTop: 4,
    marginBottom: 4,
    flex: 1
  },
  image: {
    height: 350,
    width:  350,
    flex: 1
  }
});
export default connect((state, ownProps) => ({
    userName: state.loginForm.userName,
    matches: state.match.matches,
    matchToggle: state.match.matchToggle,
    loading: state.match.loading
}))(MatchList);
