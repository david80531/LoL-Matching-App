import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

export function getMatchIcon({size=appMetrics.fontSizeBase,
    onPress=undefined, style=undefined}) {
      return <Icon name="handshake-o" size={size} onPress={onPress} style={style} />;
}
