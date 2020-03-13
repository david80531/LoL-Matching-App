import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import NavigationContainer from './NavigationContainer';
import InformList from './InformList.js';
import {clearInfoNum} from '../states/inform-actions.js';
import {connect} from 'react-redux';

class InformCenterScreen extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    }


    constructor(props) {
        super(props);
    }

    ComponentDidMount(){
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <NavigationContainer navigate={navigate} title='Information Center'>
                <InformList navigate={navigate}>
                </InformList>
            </NavigationContainer>
        );
    }

}

export default connect(state => ({
    informNum: state.inform.informNum
}))(InformCenterScreen);
