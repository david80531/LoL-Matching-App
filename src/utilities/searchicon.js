import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

export function getSearchIcon({size=appMetrics.fontSizeBase,
    onPress=undefined, style=undefined}) {
      return <Icon name="search" size={size} onPress={onPress} style={style} />;
}
