import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { Marker } from "react-native-maps";
import images from "../Constants/images";
import MapView , { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const coordinates = [
  {
    latitude: 37.771707,
    longitude: -122.4053769,
  },
  {
    latitude: 37.3318456,
    longitude: -122.0296002,
  },
  {
    latitude: 37.4275,
    longitude: -122.1697,
  },
  {
    latitude: 37.7694,
    longitude: -122.4862,
  },
];

const GOOGLE_MAPS_APIKEY = "Replace with your own"
const GOOGLE_MAPS_APITKEY_GEOCODING = "Replace with your own"



const SavedRoutes = ({ route, navigation }) => {
    Geocoder.init(GOOGLE_MAPS_APITKEY_GEOCODING)

    const [endPoint, setEndPoint] = useState(0)
    const [centerLat, setCenterLat] = useState(0)
    const [centerLng, setCenterLng] = useState(0)

    React.useEffect(() => {
      let {destination} = route.params;
      console.log(destination)
      if (destination === "Apple Park") {
        setEndPoint(1)
        var lat = (coordinates[0].latitude + coordinates[1].latitude) / 2
        var lng = (coordinates[0].longitude + coordinates[1].longitude) / 2
        setCenterLng(lng)
        setCenterLat(lat)
      }
      else if (destination === "Stanford University") {
        setEndPoint(2)
        var lat = (coordinates[0].latitude + coordinates[2].latitude) / 2
        var lng = (coordinates[0].longitude + coordinates[2].longitude) / 2
        setCenterLng(lng)
        setCenterLat(lat)
      }
      else {
        setEndPoint(3)
        var lat = (coordinates[0].latitude + coordinates[3].latitude) / 2
        var lng = (coordinates[0].longitude + coordinates[3].longitude) / 2
        setCenterLng(lng)
        setCenterLat(lat)
      }
    }, [])

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
          <TouchableOpacity underlayColor="#fff" onPress={() => navigation.navigate("Home")}>
            <Icon name="home" type="simplelineicons" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.titleFonts}>My Current Route</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.771707,
              longitude: -122.3053769,
              latitudeDelta: 0.522,
              longitudeDelta: 0.721,
            }}
          >
            <Marker
              coordinate = {{
                latitude: 37.771707,
                longitude: -122.4053769,
              }}
            />
            <Marker
              coordinate = {coordinates[endPoint]}
              pinColor = {"navy"}
            />
            <MapViewDirections
              origin={coordinates[0]}
              destination={coordinates[endPoint]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth = {3}
              strokeColor = "hotpink"
            />
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            underlayColor="#fff"
            onPress={() =>
              navigation.navigate("EmergencyContacts", { newFriendsData: [], title: "Send My Route To" })
            }
          >
            <Text style={styles.buttonTextStyle}>Send to friends</Text>
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
    shadowOffset: {width: 2, height: 2,},
    shadowColor: 'black',
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

export default SavedRoutes;
