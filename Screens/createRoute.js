import React, { useState } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { Marker } from "react-native-maps";
import images from "../Constants/images";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Picker } from '@react-native-picker/picker';

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
const GOOGLE_MAPS_APIKEY = "replacewithyourown"

const CreateRoute = ({ navigation }) => {
  const [destintation, setDestination] = useState("")
  const [x, setX] = useState({
    latitude: 37.771707,
    longitude: -122.4053769
  })
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
          <Text style={styles.titleFonts}>Enter Destination</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
            marginTop: 10,
          }}
          >
            <TextInput
              style={styles.textInput}
              onChangeText={setDestination}
              value={destintation}
              placeholder="Search"
            />
            <TouchableOpacity
              style={styles.smallButton}
              underlayColor="#fff"
              onPress={() =>
                navigation.navigate("ModeSelection", {destination: destintation})
              }
            >
              <Icon name="search" type="ionicon" size={25}/>
            </TouchableOpacity>
          </View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.771707,
              longitude: -122.4053769,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker draggable
              coordinate = {x}
              onDragEnd={(e) => setX(e.nativeEvent.coordinate)}
            />
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            underlayColor="#fff"
            onPress={() => navigation.navigate("SavedList")}
          >
            <Text style={styles.buttonTextStyle}>Saved Routes</Text>
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
    height: height * 0.63,
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
  textInput: {
    height: 50,
    width: width*0.75,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  smallButton: {
    backgroundColor: "#FFD64D",
    borderRadius: 8,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    shadowOffset: {width: 2, height: 2,},
    shadowColor: 'black',
    shadowOpacity: 0.1,
  }
});

export default CreateRoute;
