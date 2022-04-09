import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { Marker } from "react-native-maps";
import images from "../Constants/images";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geocoder from "react-native-geocoding";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const GOOGLE_MAPS_APIKEY = "replace with your own api key";
const coordinates = [
  {
    latitude: 37.3318456,
    longitude: -122.0296002,
  },
  {
    latitude: 37.771707,
    longitude: -122.4053769,
  },
];
const FriendsStatus = ({ route, navigation }) => {
  const [name, setName] = useState(0);
  const [startLat, setStartLat] = useState(0);
  const [startLng, setStartLng] = useState(0);
  const [endLat, setEndLat] = useState(0);
  const [endLng, setEndLng] = useState(0);
  const [centerLat, setCenterLat] = useState(0);
  const [centerLng, setCenterLng] = useState(0);

  React.useEffect(() => {
    let { name, startLat, startLng, endLat, endLng } = route.params;
    {
      console.log("startLat here is", startLat);
    }
    setStartLat(startLat);
    setStartLng(startLng);
    setEndLat(endLat);
    setEndLng(endLng);
    setName(name);
    //var lat = (startLat + endLat) / 2;
    //var lng = (startLng + endLng) / 2;
    //setCenterLng(lng);
    //setCenterLat(lat);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            underlayColor="#fff"
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" type="ionicon" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={images.Logo}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor="#fff"
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="home" type="simplelineicons" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.titleFonts}>{name}'s Route</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: coordinates[1].latitude,
              longitude: coordinates[1].longitude,
              latitudeDelta: 0.322,
              longitudeDelta: 0.2421,
            }}
          >
            <Marker coordinate={{ latitude: startLat, longitude: startLng }} />
            <Marker
              coordinate={{ latitude: endLat, longitude: endLng }}
              pinColor={"navy"}
            />
            <MapViewDirections
              origin={{ latitude: startLat, longitude: startLng }}
              destination={{ latitude: endLat, longitude: endLng }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            underlayColor="#fff"
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonTextStyle}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  bodyContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  titleFonts: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  map: {
    marginTop: 10,
    width: width * 0.9,
    height: height * 0.7,
  },
  buttonStyle: {
    backgroundColor: "#FFD64D",
    borderRadius: 8,
    height: 60,
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
  buttonTextStyle: {
    color: "black",
    margin: 10,
    fontWeight: "600",
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});

export default FriendsStatus;
