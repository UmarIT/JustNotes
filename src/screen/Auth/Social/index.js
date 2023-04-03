// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import jwt_decode from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
// import Geocoder from 'react-native-geocoding';
// import Geolocation from 'react-native-geolocation-service';
// import OneSignal from 'react-native-onesignal';
// import DropDownIcon from 'react-native-vector-icons/AntDesign';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {useDispatch} from 'react-redux';
// import Back from '../../../assets/Svg/Back.svg';
// import Pin from '../../../assets/Svg/PinBlue.svg';
// import Button from '../../../components/CustomButton';
// import Map from '../../../components/CustomMap';
// import CustomModal from '../../../components/CustomModal';
// import Snackbar from '../../../components/CustomSnackbar';
// import {locationApis, social_Login} from '../../../endpoints';
// import {setToken, setUser} from '../../../redux/slices/userSlice';
// import {usePostApiMutation} from '../../../services/service';
import {useThemeAwareObject} from '../../../theme/index';
import {hp} from '../../../util';
import createStyles from './styles';

// import appleAuth from '@invertase/react-native-apple-authentication';
// import {
//   AccessToken,
//   AuthenticationToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk-next';

const Social = () => {
  // const dispatch = useDispatch();

  const [facebookLoader, setFacebookLoader] = useState(false);
  const [googleLoader, setGoogleLoader] = useState(false);
  const [appleLoader, setAppleLoader] = useState(false);
  const styles = useThemeAwareObject(createStyles);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     scopes: ['profile', 'email'],
  //     androidClientId:
  //       '332091839651-mqd10kt9cg8jvjfqb5abr97nj83e1lts.apps.googleusercontent.com',
  //     webClientId:
  //       '332091839651-1dq380op5hfki3ajq379mogf1arebr17.apps.googleusercontent.com',
  //     iosClientId:
  //       '332091839651-5vc73igddmg0vu0kurblcl7q9tk2s5pv.apps.googleusercontent.com',
  //   });
  // }, []);

  const signInWithGoogle = async () => {
    GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      setUserInformation(userInfo);

      googleAuth(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setGoogleLoader(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setGoogleLoader(false);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setGoogleLoader(false);
      } else {
        setGoogleLoader(false);
      }
    }
  };

  const googleAuth = async userInfo => {
    let form = new FormData();
    form.append('name', userInfo.user.name);
    form.append('email', userInfo.user.email.toLowerCase());
    form.append('google_id', userInfo.user.id);
    form.append('is_google', true);
    form.append('user_type', 'user');

    setGoogleLoader(true);
    let apiData = {
      url: social_Login,
      method: 'POST',
      data: form,
    };

    try {
      let res = await socialCall(apiData).unwrap();

      if (res.statusCode == 200) {
        if (res.Data.user.user_type == 'user') {
          if (
            res.Data.user.latitude == null &&
            res.Data.user.longitude == null
          ) {
            setOneSignalKey(res.Data.oneSignalHash);

            addressCheck();
            setLocationToken(res.Data.access_token);
          } else {
            OneSignal.setExternalUserId(
              res.Data.user?.email?.toLowerCase(),
              res?.Data?.oneSignalHash,
            );

            dispatch(setToken(res.Data.access_token));
            dispatch(setUser(res.Data.user));

            setGoogleLoader(false);
          }
        } else {
          Snackbar('Select valid user type');
          setGoogleLoader(false);
        }
      } else {
        Snackbar(res.message);
        setGoogleLoader(false);
      }
    } catch (error) {
      setGoogleLoader(false);
    }
  };

  const signInWithFacebook = async () => {
    setFacebookLoader(true);
    LoginManager.logOut();
    try {
      const results = await LoginManager.logInWithPermissions([
        'email',
        'public_profile',
        'user_friends',
      ]);

      if (Platform.OS === 'ios') {
        const result =
          await AuthenticationToken.getAuthenticationTokenIOS().then(data => {
            const processRequest = new GraphRequest(
              '/me?fields=name,email',
              null,
              (err, res) =>
                getResponseInfo(err, res, result?.authenticationToken),
            );
            new GraphRequestManager().addRequest(processRequest).start();
          });
      } else {
        if (!results.isCancelled) {
        }
        const result = AccessToken.getCurrentAccessToken().then(data => {
          const processRequest = new GraphRequest(
            '/me?fields=name,email',
            null,
            (err, res) =>
              getResponseInfo(err, res, data?.accessToken.toString()),
          );
          new GraphRequestManager().addRequest(processRequest).start();
        });
      }
    } catch (error) {
      setFacebookLoader(false);
    }
  };

  const getResponseInfo = (error, result, info) => {
    if (error) {
      setFacebookLoader(false);
    } else {
      facebookAuth(result, info);
    }
  };

  const facebookAuth = async (result, info) => {
    let form = new FormData();
    form.append('name', result.name);
    form.append('email', result.email.toLowerCase());
    form.append('facebook_id', result.id);
    form.append('is_facebook', true);
    form.append('user_type', 'user');
    let apiData = {
      url: social_Login,
      method: 'POST',
      data: form,
    };
    try {
      let res = await socialCall(apiData).unwrap();
      if (res.statusCode == 200) {
        if (res.Data.user.user_type == 'user') {
          if (
            res.Data.user.latitude == null &&
            res.Data.user.longitude == null
          ) {
            setOneSignalKey(res.Data.oneSignalHash);
            addressCheck();
            setLocationToken(res.Data.access_token);
          } else {
            OneSignal.setExternalUserId(
              res.Data.user?.email?.toLowerCase(),
              res?.Data?.oneSignalHash,
            );

            dispatch(setToken(res.Data.access_token));
            dispatch(setUser(res.Data.user));

            setGoogleLoader(false);
          }
        } else {
          Snackbar('Select valid user type');

          setFacebookLoader(false);
        }
      } else {
        Snackbar(res.message);
        setGoogleLoader(false);
      }
    } catch (e) {
      setFacebookLoader(false);
    }
  };

  const signInWithApple = async () => {
    setAppleLoader(true);
    const appleAuthRequestResponse = await appleAuth
      .performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })
      .then(async appleAuthResponse => {
        const {email, email_verified, is_private_email, sub, name} = jwt_decode(
          appleAuthResponse?.identityToken,
        );

        let form = new FormData();
        form.append(
          'name',
          appleAuthResponse.fullName.givenName +
            appleAuthResponse.fullName.familyName,
        );
        form.append(
          'email',
          appleAuthResponse.email
            ? appleAuthResponse.email?.toLowerCase()
            : email.toLowerCase(),
        );
        form.append('apple_id', appleAuthResponse.user);
        form.append('is_apple', true);
        form.append('user_type', 'user');

        let apiData = {
          url: social_Login,
          method: 'POST',
          data: form,
        };

        try {
          let res = await socialCall(apiData).unwrap();

          if (res.statusCode == 200) {
            if (res.Data.user.user_type == 'user') {
              if (
                res.Data.user.latitude == null &&
                res.Data.user.longitude == null
              ) {
                setOneSignalKey(res.Data.oneSignalHash);
                addressCheck();
                setLocationToken(res.Data.access_token);
              } else {
                OneSignal.setExternalUserId(
                  res.Data.user?.email?.toLowerCase(),
                  res?.Data?.oneSignalHash,
                );

                dispatch(setToken(res.Data.access_token));
                dispatch(setUser(res.Data.user));

                setGoogleLoader(false);
              }
            } else {
              Snackbar('Select valid user type');
              setGoogleLoader(false);
            }
          } else {
            Snackbar(res.message);
            setGoogleLoader(false);
          }
        } catch (error) {
          setAppleLoader(false);
        }
      });
  };

  return (
    <>
      <View style={styles.socialContainer}>
        <TouchableOpacity
          // onPress={() => !googleLoader && signInWithGoogle()}
          style={{
            width: hp(5),
            height: hp(5),
            borderRadius: googleLoader ? hp(1.0) : null,
            borderColor: googleLoader ? '#aaa' : null,
            borderWidth: googleLoader ? hp(0.02) : null,
          }}>
          {googleLoader ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={'#161140'} size={'small'} />
            </View>
          ) : (
            <Image
              source={require('../../../../assets/png/googleIcon.png')}
              resizeMode="contain"
              style={{
                width: hp(5),
                height: hp(5),
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => !facebookLoader && signInWithFacebook()}
          style={{
            width: hp(5),
            height: hp(5),
            borderRadius: facebookLoader ? hp(1.0) : null,
            borderColor: facebookLoader ? '#aaa' : null,
            borderWidth: facebookLoader ? hp(0.02) : null,
          }}>
          {facebookLoader ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={'#161140'} size={'small'} />
            </View>
          ) : (
            <Image
              source={require('../../../../assets/png/facebookIcon.png')}
              resizeMode="contain"
              style={{
                width: hp(5),
                height: hp(5),
              }}
            />
          )}
        </TouchableOpacity>
        {Platform.OS == 'ios' && (
          <TouchableOpacity
            onPress={() => !appleLoader && signInWithApple()}
            style={{
              width: hp(5),
              height: hp(5),
              borderRadius: appleLoader ? hp(1.0) : null,
              borderColor: appleLoader ? '#aaa' : null,
              borderWidth: appleLoader ? hp(0.02) : null,
            }}>
            {appleLoader ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={'#161140'} size={'small'} />
              </View>
            ) : (
              <Image
                source={require('../../../../assets/png/appleIcon.png')}
                resizeMode="contain"
                style={{
                  width: hp(5),
                  height: hp(5),
                }}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Social;
