import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import {baseUrl} from '../constants';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';
import Text from './Text';

function CustomCategory(props) {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      imageStyle: {
        height: wp(42),
        width: wp(42),
        borderRadius: theme.borders.radius2,
        overflow: 'hidden',
        backgroundColor: theme.color.shadowColor,
      },
      textStyle: {
        width: wp(42),
        textAlignVertical: 'center',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        paddingBottom: hp(0.5),
        color: theme.color.white,
        fontSize: hp(2.2),
        fontFamily: theme.family.medium,
        backgroundColor: theme.color.blackOverlay,
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <TouchableOpacity
      style={props.style}
      onPress={props.onPress}
      activeOpacity={1}>
      <Image
        source={{uri: baseUrl.imgUrl + props.image}}
        style={styles.imageStyle}
      />
      <Text numberOfLines={2} style={styles.textStyle}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomCategory;
