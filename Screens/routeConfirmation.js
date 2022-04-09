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
const GOOGLE_MAPS_APIKEY = "Replace with your own";
const GOOGLE_MAPS_APITKEY_GEOCODING = "Replace with your own"

const RouteConfirmation = ({ route, navigation }) => {
  const myContext = useContext(AppContext);

  Geocoder.init(GOOGLE_MAPS_APITKEY_GEOCODING);

  const [endPoint, setEndPoint] = useState(route.params.destination);
  const [destLat, setDestLat] = useState(0);
  const [destLng, setDestLng] = useState(0);
  const [coordList, setCoordList] = useState([]);
  const [destination, setDestination] = useState("")
  React.useEffect(() => {
    let {destLat, destLng, markers, destinationString} = route.params;
    setDestination(destinationString)
    setDestLat(destLat)
    setDestLng(destLng)
    setCoordList(markers)
  }, []);


  const createTwoButtonAlert = () =>
    Alert.alert(
      "Saving your route to",
      destination,
      [
        {
          text: "Confirm",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Cancel", onPress: () => console.log("OK Pressed") }
      ]
    );
    const createTwoButtonAlertToHome = () =>
    Alert.alert(
      "Starting your route to",
      destination,
      [
        {
          text: "Cancel",
          onPress: () => navigation.navigate("Home"),
          style: "cancel"
        },
        { text: "Confirm", onPress: () => console.log("OK Pressed") }
      ]
    );

  const onPress = () => {
    navigation.navigate("EmergencyContacts", {
      newFriendsData: [],
      title: "Share Route With",
    });
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
          {console.log(myContext.counter)}
              {console.log("route confirmation", myContext.numMarkers)}
          <Text
            style={{
              textAlign: 'center',
              paddingHorizontal: 40,
              marginVertical: 2,
              fontWeight: "600",
              fontSize: 16
            }}
          >
            {Math.floor(myContext.counter/(myContext.numMarkers + 1))}% Completed
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
            <Marker
              coordinate={{
                latitude: myContext.destination.latitude,
                longitude: myContext.destination.longitude,
              }}
            />
            {myContext.markers.map((item, index) => {
                return(
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
              origin={coordinates[1]}
              destination={myContext.destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          </MapView>
        </View>
        <Button
          title="Save Route"
          titleStyle={styles.buttonTextStyle}
          buttonStyle={styles.whiteButtonStyle}
          containerStyle={styles.buttonContainer}
          onPress={createTwoButtonAlert}
        />
          <View style={styles.halfButtonContainer}>
            <TouchableOpacity
              style={styles.halfButtonStyle}
              underlayColor="#fff"
              onPress={onPress}
            >
              <Text style={styles.buttonTextStyle}>Share Route</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.halfButtonStyle}
              underlayColor="#fff"
              onPress={createTwoButtonAlertToHome}
            >
              <Text style={styles.buttonTextStyle}>Start Route</Text>
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
    height: height * 0.61,
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
    borderWidth: 1,
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
    marginLeft: 7
  },
  buttonStyle: {
    backgroundColor: '#FFD64D',
    borderRadius: 8,
    height: 60,
    width: width*0.9,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 2, height: 2,},
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  buttonTextStyle: {
    color: 'black',
    margin: 10,
    fontWeight: '600',
    fontSize: 20
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  }
});

export default RouteConfirmation;
