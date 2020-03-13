import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform} from 'react-native'

import {Container, Content, Thumbnail, Icon, Badge, Button, Text as NbText} from 'native-base';
import appColors from '../styles/colors';
import {connect} from 'react-redux';
import {clearInfoNum} from '../states/inform-actions.js';
import {getUserIcon} from '../utilities/usericon.js';
import {getInfoIcon} from '../utilities/infoicon.js';
import {getMatchIcon} from '../utilities/matchicon.js';
import {getSearchIcon} from '../utilities/searchicon.js';


class DrawerSideBar extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleNavInform = this.handleNavInform.bind(this);
    }

    handleNavInform(){
        const {navigate, dispatch} = this.props;

        dispatch(clearInfoNum());
        navigate('Information');
    }

    render() {
      const {navigate, informNum, championName} = this.props;
      return (
        <Container style={styles.drawer}>
            <Image style={{width: 200, height: 100}} source={require('../images/drawer_bg.jpg')} style={styles.header}>
               <View style = {{backgroundColor:'rgba(0,0,0,0.7)',width: 300, height: 200,alignItems:'center',justifyContent:'center'}}>
                <Image style={{width: 90, height: 90 ,borderRadius:45}} source={{uri: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/'+championName+'.png'}}/>
               </View>
             </Image>
            <Button block transparent style={styles.item} onPress={() => navigate('User')}>
                {getUserIcon({size: 23,style: styles.drawerIcon})}
                <Text style={styles.text}>  User Profile</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={this.handleNavInform}>
                {getInfoIcon({size: 23,style: styles.drawerIcon})}
                <Text style={styles.text}> Information Center</Text>
                <Badge primary style={styles.badge}>
                    <NbText style={styles.badgeText}>{informNum}</NbText>
                </Badge>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Match')}>
                {getMatchIcon({size: 23,style: styles.drawerIcon})}
                <Text style={styles.text}>Match</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('SearchPage')}>
                {getSearchIcon({size: 23,style: styles.drawerIcon})}
                <Text style={styles.text}>  Search</Text>
            </Button>
        </Container>
    );
    }
}

const styles = {
    drawer: {
        flex: 1,
        backgroundColor: '#91989f'
    },
    header: {
        width: undefined,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    item: {
        alignItems: 'center'
    },
    icon: {
        color: 'white'
    },
    text: {
        color: 'white',
        fontSize: (Platform.OS === 'ios') ? 17 : 19,
        fontWeight: 'bold',
        flex: 1,
        marginHorizontal: 12
    }
};

export default connect(state => ({
    informNum: state.inform.informNum,
    championName: state.user.championName,

}))(DrawerSideBar);
