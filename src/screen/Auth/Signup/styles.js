import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../util/index';

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.appBackground,
    },
    contentContainerStyle: {
      marginHorizontal: wp(8),

      flexGrow: 1,
    },
    headingStyle: {
      marginTop: hp(3),
      textAlign: 'center',
      fontSize: theme.size.medium,
      fontFamily: theme.family.semiBold,
      color: theme.color.textBlack,
    },

    bgStatusBar: theme.color.appBackground,
    inputStyle: {
      color: theme.color.textBlack,
    },
    imageView: {
      justifyContent: 'center',
    },
    forgotView: {
      alignItems: 'flex-end',

      alignSelf: 'flex-end',
      marginTop: hp(-2),
    },
    forgotText: {
      color: theme.color.buttonBackground,
      fontSize: hp(1.7),
    },
    loginContainer: {
      backgroundColor: theme.color.buttonBackground,
      width: wp(82),
      height: hp(7),
      marginTop: hp(5),
      borderRadius: theme.borders.radius2,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    loginText: {
      color: theme.color.appBackground,
      fontSize: theme.size.small,
      fontFamily: theme.family.semiBold,
    },
    dotLine: {
      marginTop: hp(5),
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: theme.color.secondaryColor,
    },
    orSignInStyle: {
      marginTop: hp(2),
      textAlign: 'center',
      color: theme.color.buttonBackground,
      fontFamily: theme.family.bold,
    },
    doNotHaveAccountView: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: hp(5),
      marginBottom: hp(3),
    },
    textAnAccount: {
      color: theme.color.textBlack,
    },
    signUp: {
      color: theme.color.buttonBackground,
      textDecorationLine: 'underline',
      fontFamily: theme.family.bold,
    },
    error: theme.color.red,
  });
  return styles;
};
export default createStyles;
