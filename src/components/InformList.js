import React from 'react';
import PropTypes from 'prop-types';
import {View, ListView, RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import InformItem from './InformItem.js';
import {connect} from 'react-redux';

class InformList extends React.Component {
    static propTypes = {
        navigate: PropTypes.func,
        informs: PropTypes.array,
        setting: PropTypes.bool,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };
        console.log('In InformList');
        console.log(this.props.informs);

        //this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentWillReceiveProps (nextProps) {


        if(nextProps.informs !== this.props.informs){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.informs.reverse())
            });
        }
    }

    componentDidMount(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.informs.reverse())
        });
    }

    render() {
        const {informs, setting, dispatch, navigate} = this.props;
        let children = (
          <View style = {styles.container}>
            <Text >Don't have any information yet!</Text>
          </View>
        );

        if(informs.length) {
          children = (
              <ListView
                  refreshControl={
                      <RefreshControl refreshing={setting} />
                  }
                  renderScrollComponent={props => <ScrollView {...props}/>}
                  dataSource={this.state.dataSource}
                  renderRow={(p) => {
                      console.log(p);
                      return <InformItem navigate={navigate} {...p}/>
                  }}
                  style={{backgroundColor:'rgb(213, 213, 213)'}}>
              </ListView>
          );
        }


        return (
            <View>
              {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#406E9F',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }

});

export default connect (state => ({
    informs: state.inform.informs,
    setting: state.inform.setting
}))(InformList);
