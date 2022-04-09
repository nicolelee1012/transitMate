import React, { useState, useContext } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AppContext from "./appContext";
import { Text, Card, Button, Icon } from "react-native-elements";
import { Marker } from "react-native-maps";
import images from "../Constants/images";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Geocoder from "react-native-geocoding";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
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
const GOOGLE_MAPS_APIKEY = "AIzaSyBV_EvsR_SI9az9aAUM_ch9UU3MswZAqJM";
const GOOGLE_MAPS_APITKEY_GEOCODING = "AIzaSyA4EvUX1w061o9J8CsYOYFWJWVfPZSSs0s";

const PostConfirmation = ({ route, navigation }) => {
  const myContext = useContext(AppContext);

  Geocoder.init(GOOGLE_MAPS_APITKEY_GEOCODING);

  //const [endPoint, setEndPoint] = useState(route.params.destination);
  const [destLat, setDestLat] = useState(0);
  const [destLng, setDestLng] = useState(0);
  const [coordList, setCoordList] = useState([]);
  const [destination, setDestination] = useState("");
  const [numMarkers, setNumMarkers] = useState(myContext.numMarkers);
  React.useEffect(() => {
    /*let {destLat, destLng, markers, destinationString} = route.params;
    setDestination(destinationString)
    setDestLat(destLat)
    setDestLng(destLng)
    setCoordList(markers)*/
  }, []);

  const onPress = () => {
    navigation.navigate("EmergencyContacts", {
      newFriendsData: [],
      title: "Share Route With",
    });
  };
  const onPressEnd = () => {
    myContext.notOnRoute();
    navigation.navigate("Home");
  };

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
          <Text style={styles.titleFonts}>Your Route</Text>
          {console.log("counter is", myContext.counter)}
          {console.log("numMarker is", myContext.numMarkers)}
          <Text
            style={{
              textAlign: 'center',
              paddingHorizontal: 40,
              marginVertical: 2,
              fontWeight: "600",
              fontSize: 16
            }}>
              {console.log("testing this", (myContext.counter /(1+ parseInt(myContext.numMarkers))))}
            {Math.floor(100 * (myContext.counter /(1+ parseInt(myContext.numMarkers))))}% Complete
          </Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: myContext.origin.latitude,
              longitude: myContext.origin.longitude,
              latitudeDelta: 0.322,
              longitudeDelta: 0.2421,
            }}
          >
            <Marker coordinate={myContext.origin} />
            <Marker coordinate={myContext.destination} />
            {myContext.markers.map((item, index) => {
              return index < myContext.counter ? (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  pinColor="blue"
                />
              ) : (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  pinColor="orange"
                />
              );
            })}
            <MapViewDirections
              origin={myContext.origin}
              destination={myContext.destination}
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
            onPress={() =>
              navigation.navigate("EmergencyContacts", {
                title: "Send My Location To"
              })
            }
          >
            <Text style={styles.buttonTextStyle}>Send My Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.blackbuttonStyle}
            underlayColor="#fff"
            onPress={onPressEnd}
          >
            <Text style={styles.whitebuttonTextStyle}>End Route</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  blackbuttonStyle: {
    backgroundColor: "black",
    borderRadius: 8,
    height: 50,
    width: width * 0.9,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
  whitebuttonTextStyle: {
    color: "white",
    margin: 10,
    fontWeight: "600",
    fontSize: 20,
  },
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
    height: height * 0.63,
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
  halfButtonStyle: {
    backgroundColor: "#FFD64D",
    borderRadius: 8,
    height: 60,
    width: width * 0.43,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
  whiteButtonStyle: {
    backgroundColor: "white",
    borderColor: "black",
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
  halfButtonContainer: {
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 7,
  },
  buttonStyle: {
    backgroundColor: "#FFD64D",
    borderRadius: 8,
    height: 50,
    width: width * 0.9,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    marginBottom: 10,
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

export default PostConfirmation;
