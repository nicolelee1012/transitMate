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
const GOOGLE_MAPS_APIKEY = "replace";

const CheckPoints = ({ navigation }) => {
  const myContext = useContext(AppContext);

  //Geocoder.init(GOOGLE_MAPS_APITKEY_GEOCODING);

  //const [endPoint, setEndPoint] = useState(route.params.destination);
  const [destLat, setDestLat] = useState(0);
  const [destLng, setDestLng] = useState(0);
  const [coordList, setCoordList] = useState([]);
  React.useEffect(() => {

  }, []);

  const onPress = () => {
    navigation.navigate("RouteConfirmation", {
      destLat: destLat,
      destLng: destLng,
      markers: coordList,
      origin: coordinates[1],
      destinationString: endPoint
    });
    myContext.toggleOnRoute();
    myContext.changeDestination({latitude: destLat, longitude: destLng});
    myContext.changeOrigin(coordinates[1]);
    myContext.changeMarkers(coordList)
    //myContext.onRoute = true;
    console.log("mycontext in routeview is", myContext.onRoute);
  };

  const moveCoord = (coordinate, index) => {
    coordList[index].latitude = coordinate.latitude;
    coordList[index].longitude = coordinate.longitude;
    setCoordList(coordList);
  };

  const onPressYes = () => {
myContext.increment();
      myContext.increment();
      navigation.navigate("PostConfirmation")

  }

  const onPressEnd = () => {
      myContext.notOnRoute();
      navigation.navigate("Home");
  }

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
          <Text style={styles.titleFonts}>You've Reached Checkpoint {myContext.counter + 1}</Text>

          <MapView
              style={styles.map}
              initialRegion={{
                latitude: myContext.origin.latitude,
                longitude: myContext.origin.longitude,
                latitudeDelta: 0.322,
                longitudeDelta: 0.2421,
              }}
              onPress={() => navigation.navigate("CheckPoints")}
            >
              <Marker coordinate={myContext.origin} />
              <Marker coordinate={myContext.destination} />
              {myContext.markers.map((item, index) => {
                return (
                  (index <= myContext.counter? <Marker
                  key={index}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  pinColor="blue"
                />: <Marker
                    key={index}
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                    pinColor="orange"
                  />
                ));
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
        <Text style={styles.titleFonts}>Do you feel safe?</Text>

        <View style={styles.halfButtonContainer}>
        <TouchableOpacity
            style={styles.greenhalfButtonStyle}
            underlayColor="#fff"
            onPress={onPressYes}
          >
            <Text style={styles.buttonTextStyleBlack}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pinkhalfButtonStyle}
            underlayColor="#fff"
            onPress={() => navigation.navigate("NotSafe")}
          >
            <Text style={styles.buttonTextStyleBlack}>No</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.buttonStyle}
            underlayColor="#fff"
            onPress={onPressEnd}
          >
            <Text style={styles.buttonTextStyle}>End Route</Text>
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
  halfButtonContainer: {
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    marginLeft: 7
  },
  greenhalfButtonStyle: {
    marginTop: 10,
    backgroundColor: "#3FE465",
    borderRadius: 8,
    height: 50,
    width: width * 0.43,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
  pinkhalfButtonStyle: {
    marginTop: 10,
    backgroundColor: "#FF4051",
    borderRadius: 8,
    height: 50,
    width: width * 0.43,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.1,
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
    marginBottom: 20,
    width: width * 0.9,
    height: height * 0.58,
  },

  buttonTextStyleBlack: {
    color: "black",
    fontWeight: "600",
    fontSize: 20,
    fontWeight: '600',
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderRadius: 8,
    height: 50,
    width: width*0.9,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 2, height: 2,},
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  buttonTextStyle: {
    color: 'white',
    margin: 10,
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  titleFonts: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CheckPoints;
