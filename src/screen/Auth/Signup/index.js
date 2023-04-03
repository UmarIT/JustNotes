import {Formik} from 'formik';
import React, {useState} from 'react';
import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useThemeAwareObject} from '../../../theme/index';
import createStyles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import Social from '../../../screen/Auth/Social/index';

import Button from '../../../components/Button';
import Text from '../../../components/Text';
import FormInput from '../../../components/FormInput';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {hp, wp} from '../../../util';
import Snackbar from '../../../components/Snackbar';
const Signup = props => {
  const styles = useThemeAwareObject(createStyles);
  const [passwordIcon, setPasswordIcon] = useState(true);

  const user = useSelector(state => state.user.userData);

  const dispatch = useDispatch();
  function PasswordRightIcon() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setPasswordIcon(!passwordIcon);
        }}>
        {icon()}
      </TouchableOpacity>
    );
  }
  function icon() {
    if (passwordIcon) {
      return <FontAwesome5 name="eye" size={18} />;
    } else {
      return <FontAwesome5 name="eye-slash" size={18} />;
    }
  }

  const SignupApiCalling = values => {
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        const user = firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            firstName: values.fname,
            LastName: values.lname,
            Email: values.email,
          });

        Snackbar('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Snackbar('That email address is already in use!', error);
        }

        if (error.code === 'auth/invalid-email') {
          Snackbar('That email address is invalid!', error);
        }
      });
  };
  const minPass = 8;
  const validationSchema = yup.object().shape({
    fname: yup
      .string('First name Required')

      .label('First Name')
      .required('First name is required'),
    lname: yup
      .string('Last name Required')

      .label('Last Name')
      .required('Last name is required'),
    email: yup
      .string('Email Required')
      .email()
      .label('Email')
      .required('Email is required'),
    password: yup
      .string('Password Required')
      .label('Password')
      .required('Password is required')
      .min(
        minPass,
        ({}) =>
          `Minimum ${minPass} characters. 1 capital and 1 lower case and 1 special character is must.`,
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\()*])(?=.{8,})/,
        `Minimum ${minPass} characters. 1 capital and 1 lower case and 1 special character is must.`,
      ),
  });

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'always'}>
      <StatusBar backgroundColor={styles.bgStatusBar} barStyle="dark-content" />
      <Image
        source={require('../../../../assets/png/Logo.png')}
        resizeMode="contain"
        style={{
          width: hp(10),
          height: hp(10),
          alignSelf: 'center',
          marginTop: hp(5),
        }}
      />
      <Text style={styles.headingStyle}> Sign up</Text>
      <Formik
        initialValues={{email: '', password: '', fname: '', lname: ''}}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={values => SignupApiCalling(values)}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, handleBlur, errors, values}) => (
          <>
            <View>
              <FormInput
                containerStyle={{marginTop: hp(5)}}
                inputStyle={styles.inputStyle}
                label="First Name"
                placeholder="Enter your first name "
                value={values.fname}
                onChangeText={handleChange('fname')}
                onBlur={handleBlur('fname')}
                errorMsg={errors.fname}
                appendComponent={
                  <View style={styles.imageView}>
                    <FontAwesome name="user-o" size={20} />
                  </View>
                }
              />
              <FormInput
                inputStyle={styles.inputStyle}
                label="Last Name"
                keyboardType="email-address"
                autoCompleteType="email"
                placeholder="Enter your last name "
                value={values.lname}
                onChangeText={handleChange('lname')}
                onBlur={handleBlur('lname')}
                errorMsg={errors.lname}
                appendComponent={
                  <View style={styles.imageView}>
                    <FontAwesome name="user-o" size={20} />
                  </View>
                }
              />
              <FormInput
                inputStyle={styles.inputStyle}
                label="Email"
                keyboardType="email-address"
                autoCompleteType="email"
                placeholder="Enter your email address "
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                errorMsg={errors.email}
                appendComponent={
                  <View style={styles.imageView}>
                    <Fontisto name="email" size={20} />
                  </View>
                }
              />
              <FormInput
                inputStyle={styles.inputStyle}
                label="Password"
                placeholder="Enter password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                errorMsg={errors.password}
                secureTextEntry={passwordIcon}
                appendComponent={
                  <View style={styles.imageView}>{PasswordRightIcon()}</View>
                }
              />
            </View>

            <Button
              style={[styles.forgotView, styles.forgotText]}
              title1="Forgot Password?"
              onPress={() => props.navigation.navigate('ForgotPassword')}
            />

            <Button
              style={[styles.loginContainer, styles.loginText]}
              title1="Sign up"
              onPress={() => handleSubmit()}
              // loading={loginResponse.isLoading}
            />
            <View style={styles.dotLine}></View>

            <View
              style={{
                justifyContent: 'flex-end',
                flexGrow: 1,
                // backgroundColor: 'red',
              }}>
              <Text style={styles.orSignInStyle}>Or Sign up with</Text>

              <Social {...props} />

              <View style={styles.doNotHaveAccountView}>
                <Text style={styles.textAnAccount}>
                  Already have an account?{' '}
                </Text>
                <Text
                  onPress={() => {
                    props.navigation.replace('Login');
                  }}
                  style={styles.signUp}>
                  Sign In
                </Text>
              </View>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
