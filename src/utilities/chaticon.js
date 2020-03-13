import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

export function getChatIcon({size=appMetrics.fontSizeBase,
    onPress=undefined, style=undefined}) {
      return <Icon name="chat" size={size} onPress={onPress} style={style} />;
}
