import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';

import {useThemeAwareObject} from '../theme/index';
import {hp, wp} from '../util';

const FormInput = ({
  containerStyle,
  label,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  value,
  input,
  maxLength,
  labelTextStyle,
  errorTextStyle,
  placeholderTextColor,
  onChange,
}) => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      labelView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      labelText: {
        color: theme.color.textBlack,
        fontSize: theme.size.small,
        marginLeft: wp(2),
        bottom: hp(1),
        fontFamily: theme.family.medium,
      },
      inputView: {
        // width: wp(75),
        flexDirection: 'row',
        height: hp(7),
        paddingHorizontal: wp(2),
        // marginTop: hp(0.2),
        // marginLeft: wp(2),
        alignSelf: 'center',
        borderRadius: hp(1),
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: '#aaa ',
      },
      errorText: {
        color: theme.color.error,
        marginLeft: wp(1.8),
        marginTop: hp(0.7),
        marginBottom: hp(1),
        fontSize: theme.size.xSmall,
      },
      placeholderColor: '#aaa',
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={{...containerStyle}}>
      {/* label & error msg */}
      <View style={styles.labelView}>
        <Text style={[styles.labelText, labelTextStyle]}>{label}</Text>
      </View>
      {/* Text Input */}
      <View style={[styles.inputView, input]}>
        {prependComponent}

        <TextInput
          style={{
            flex: 1,
            ...inputStyle,
          }}
          placeholder={placeholder}
          placeholderTextColor={'#aaa'}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
        />

        {appendComponent}
      </View>
      <Text style={[styles.errorText, errorTextStyle]}>{errorMsg}</Text>
    </View>
  );
};
export default FormInput;
