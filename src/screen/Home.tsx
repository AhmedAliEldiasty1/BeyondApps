import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {UserData} from '../interface/userData';
import {getUserApi} from '../service/user-api';

export function HomeScreen({navigation}: {navigation: any}) {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({});
  const {width} = useWindowDimensions();

  const getApi = async () => {};

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFetchLoading(true);
      (async () => {
        try {
          console.log('pppppppp');
          const response = await getUserApi();
          console.log('jkjkjkjk');
          setUserData(response);
          setFetchLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
    });
    return unsubscribe;
  }, [navigation]);
  console.log('====================================');
  console.log(fetchLoading);
  console.log('====================================');
  return (
    <View style={{flex: 1}}>
      {fetchLoading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator color="black" />
        </View>
      )}
      {!fetchLoading && (
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={{uri: userData?.picture?.large}}
            style={{width: width, height: width}}
          />
          <Text style={styles.Name}>
            {userData?.name?.title} {userData?.name?.first}{' '}
            {userData?.name?.last}
          </Text>
          <Text style={styles.location}>
            {userData?.location?.country} {userData?.location?.state}
          </Text>
          <Text style={styles.mobile}>{userData.phone}</Text>
          <TouchableOpacity
            style={[styles.buttonContainer, {width: (width * 3) / 4}]}
            onPress={() => navigation.navigate('Details', {userData})}>
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  location: {
    fontSize: 22,
    fontWeight: '400',
    color: '#444',
    marginVertical: 5,
  },
  mobile: {
    fontSize: 16,
    color: '#ff5c61',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 100,
    backgroundColor: '#ff5c61',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
});
