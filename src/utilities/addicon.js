import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

export function getAddIcon({size=appMetrics.fontSizeBase,
    onPress=undefined, style=undefined}) {
      return <Icon name="add" size={size} onPress={onPress} style={style} />;
}
