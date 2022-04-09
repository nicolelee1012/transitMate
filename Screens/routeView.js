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
const GOOGLE_MAPS_APITKEY_GEOCODING = "Replace with your own";

const RouteView = ({ route, navigation }) => {
  const myContext = useContext(AppContext);

  Geocoder.init(GOOGLE_MAPS_APITKEY_GEOCODING);

  const [endPoint, setEndPoint] = useState(route.params.destination);
  const [destLat, setDestLat] = useState(0);
  const [dest, setDest] = useState(null);
  const [destLng, setDestLng] = useState(0);
  const [coordList, setCoordList] = useState([]);
  const [markerNum, setMarkerNum] = useState(myContext.numMarkers)
  React.useEffect(() => {
    Geocoder.from(endPoint)
      .then((json) => {
        var location = json.results[0].geometry.location;
        console.log("location is", location);
        console.log("location latitude is", location.lat);
        var tempDest = {latitude: 0, longitude: 0}
        tempDest.longitude = location.lng
        tempDest.latitude = location.lat
        setDest(tempDest);
        setDestLat(location.lat);
        setDestLng(location.lng);
        var startLat = coordinates[1].latitude - 0.161;
        var arr = [];
        for (var i = 0; i < markerNum; i++) {
          arr.push({
            latitude: startLat + (markerNum - i) * (0.09/markerNum),
            longitude: coordinates[1].longitude + 0.11,
          });
          console.log(arr);
        }
        setCoordList(arr);
      })
      .catch((error) => console.warn(error));
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
    //myContext.changeDestCoord(dest);
    myContext.changeDestination({latitude: destLat, longitude: destLng});
    myContext.changeOrigin(coordinates[1]);
    myContext.changeMarkers(coordList);
    //myContext.onRoute = true;
    console.log("mycontext in routeview is", myContext.onRoute);
  };

  const moveCoord = (coordinate, index) => {
    coordList[index].latitude = coordinate.latitude;
    coordList[index].longitude = coordinate.longitude;
    setCoordList(coordList);
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
          <Text style={styles.titleFonts}>Set Checkpoints</Text>
          <Text style={{ textAlign: 'center', paddingHorizontal: 40, marginVertical: 2}}>
            Drag the yellow markers to any point on your route to set
            checkpoints
          </Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: coordinates[1].latitude,
              longitude: coordinates[1].longitude,
              latitudeDelta: 0.322,
              longitudeDelta: 0.2421,
            }}
          >
            <Marker coordinate={coordinates[1]} />
            <Marker
              coordinate={{
                latitude: destLat,
                longitude: destLng,
              }}
            />
            {coordList.map((item, index)=>{
         return  <Marker draggable
         key={index}
         coordinate={{
           latitude:item.latitude,
           longitude: item.longitude,
         }}
         pinColor ='orange'
         onDragEnd={(e) => moveCoord(e.nativeEvent.coordinate, index)}
       />
     })}

            <MapViewDirections
              origin={coordinates[1]}
              destination={dest}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              mode="TRANSIT"
            />
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.buttonStyle}
            underlayColor="#fff"
            onPress={onPress}
          >
            <Text style={styles.buttonTextStyle}>Confirm</Text>
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
    height: height * 0.67,
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

export default RouteView;
