import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import MapView from 'react-native-maps';
import {UserData} from '../interface/userData';

interface Props {
  route: {params: {userData: UserData}};
}

export function DetailsScreen(props: Props) {
  const userData = props.route.params.userData;
  const {width} = useWindowDimensions();
  const {picture, name, location, dob, email} = userData;

  return (
    <View style={{flex: 1, margin: 10}}>
      <FastImage
        source={{uri: picture?.large}}
        style={{
          width: width / 2,
          height: width / 2,
          borderRadius: width / 4,
          alignSelf: 'center',
        }}
      />
      <View style={styles.itemContainer}>
        <Text style={styles.Text}>Name: </Text>
        <Text style={styles.Text}>
          {name?.title} {name?.first} {name?.last}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.Text}>Age: </Text>
        <Text style={styles.Text}>{dob?.age}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.Text}>Email: </Text>
        <Text style={[styles.Text, {width: '80%'}]}>{email}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.Text}>Location: </Text>
        <Text style={[styles.Text]}>
          {location?.country} {location?.state}
        </Text>
      </View>
      <MapView
        style={{
          width: width,
          height: 200,
        }}
        initialRegion={{
          latitude: parseFloat(location?.coordinates?.latitude || '0'),
          longitude: parseFloat(location?.coordinates?.longitude || '0'),
          latitudeDelta: 30.0009,
          longitudeDelta: 30.0009,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7F2',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
});
