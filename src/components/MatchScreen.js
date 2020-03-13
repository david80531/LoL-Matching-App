import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image} from 'react-native';

import {Container, Icon, Fab, Button, Toast} from 'native-base';
import MatchList from './MatchList';
import MatchItem from './MatchItem';
import NavigationContainer from './NavigationContainer';
import {connect} from 'react-redux';

class MatchScreen extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer navigate={navigate} title='Match'>
              <View style={{flex: 1}}>
                <MatchList navigate={navigate}/>
              </View>
             </NavigationContainer>
          );
    }

}

const styles = {
    fabMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: appColors.mask
    },
    fabContainer: {
        marginLeft: 10
    },
    fab: {
        backgroundColor: appColors.primary
    },
    mood: {
        backgroundColor: appColors.primaryLightBorder
    },
    moodIcon: {
        color: appColors.primaryLightText
    }
};

export default connect((state, ownProps) => ({
}))(MatchScreen);
