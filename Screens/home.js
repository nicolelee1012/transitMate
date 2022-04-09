import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import React, { useState, useContext } from "react";
import {
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import images from "../Constants/images";
import AppContext from "./appContext";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Marker } from "react-native-maps";

const GOOGLE_MAPS_APIKEY = "replace with your own apikey";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

//https://reactnativeelements.com/docs/1.2.0/card
const Home = ({ navigation }) => {
  const [scroll, setScroll] = useState(false);
  const myContext = useContext(AppContext);
  const [onRoute, setOnRoute] = useState(myContext.onRoute);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    setOnRoute(myContext.onRoute);
    console.log("dest is", myContext.destination);
    console.log("origin is", myContext.origin);
    console.log("myContext.onroute is", myContext.onRoute);
    console.log("mycontext at home is", onRoute);
    console.log("hello");
  });

  const [buttons] = useState([
    {
      name: "Send My Location",
      icon: "location",
      type: "entypo",
      page: "MyLocation",
    },
    {
      name: "See/Request Friends' Locations",
      icon: "people",
      type: "ionicon",
      page: "AllFriendsLocation",
      location: images.FriendsLocation,
    },
    {
      name: "View Friends' Ongoing Routes",
      icon: "map",
      type: "feather",
      page: "FriendsRoutes",
    },
    {
      name: "Manage Emergency List",
      icon: "list-outline",
      type: "ionicon",
      page: "EmergencyContacts",
    },
  ]);

  const friendsData = [
    {
      name: "Angela",
      profilePic: images.AngelaPicAct,
      location: images.AngelaLoc,
      latitude: 37.3346,
      longitude: -122.0090,
      time: "2:47"
    },
    { name: "Ben",
      profilePic: images.BenPicAct,
      location: images.BenLoc,
      latitude: 37.7956,
      longitude: -122.3935,
      time: "2:31"
    },
    {
      name: "Christine",
      profilePic: images.ChristinePicAct,
      location: images.ChristineLoc,
      latitude: 37.7956,
      longitude: -122.3935,
      time: "4:11"
    },
    { name: "Jess",
      profilePic: images.JessPic,
      location: images.JessLoc,
      latitude:37.4139,
      longitude: -122.1258,
      time: "4:41"

    },
    { name: "David",
      profilePic: images.DavidPic,
      location: images.DavidLoc,
      latitude: 37.4268,
      longitude: -122.1671,
      time: "1:50"

    },
    { name: "Timmy",
      profilePic: images.TimmyPic,
      location: images.TimmyLoc,
      latitude: 37.4365,
      longitude: -122.1568,
      time: "3:20"

    },
  ];

  const renderItem = (item, index, separators) => {
    return (
      <View>
        <Card
          key={index}
          containerStyle={{
            marginTop: 15,
            width: 170,
            height: 170,
            backgroundColor: "#FFD64D",
            borderRadius: 10,
            shadowOffset: { width: 2, height: 2 },
            shadowColor: "black",
            shadowOpacity: 0.1,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            underlayColor="#fff"
            onPress={() =>
              item.item.page == "AllFriendsLocation"
                ? navigation.navigate(item.item.page, {
                    friendsData: friendsData
                  })
                : item.item.page === "EmergencyContacts"
                ? navigation.navigate(item.item.page, {
                    newFriendsData: [],
                    title: "Emergency Contacts",
                  })
                : navigation.navigate(item.item.page)
            }
          >
            <Icon name={item.item.icon} type={item.item.type} size={75} />
            <Text style={styles.bodyFonts}>{item.item.name}</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };


  const renderFriends = (item, index, separators) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FriendsLocation", {
              name: item.item.name,
              photo: item.item.profilePic,
              latitude: item.item.latitude,
              longitude: item.item.longitude,
              time: item.item.time
            })
          }
          style={styles.iconContainer}
        >
          <Image
            source={item.item.profilePic}
            style={{
              width: 62,
              height: 62,
              marginBottom: 5,
            }}
          />
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {item.item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.homeHeaderContainer}>
          <TouchableOpacity>
            <Image
              source={images.Logo}
              style={{
                width: 55,
                height: 55,
              }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity underlayColor="#fff" onPress={() => navigation.navigate("Home")}>
            <Icon name="home" type="simplelineicons" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.titleFonts}>
            Tap to see friends' last shared locations
          </Text>
          <FlatList
            horizontal
            key={"$"}
            keyExtractor={(item) => "$" + item.name}
            data={friendsData}
            renderItem={renderFriends}
            ItemSeparatorComponent={() => (
              <View style={{ paddingHorizontal: 13 }} />
            )}
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10 }}
          />
        </View>
        <View>
          <Text style={styles.titleFonts}>Ongoing route</Text>
          
          {isFocused && onRoute ? (
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: "center",}}>
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
                return(
                  (index < myContext.counter? <Marker
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
            <TouchableOpacity
              onPress={() => navigation.navigate("CheckPoints")}
              style={{position: 'absolute', bottom: 8, right: 8 }}>
              <Icon
                name="expand-outline"
                type="ionicon"
                size={45}
              />
            </TouchableOpacity>
          </View>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateRoute")}
              style={styles.createRouteContainer}
            >
              <Icon name="pluscircleo" type="antdesign" size={45} />
              <Text style={styles.createRouteFont}>Create Route</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.titleFonts}>What would you like to do?</Text>
        <FlatList
          key={"#"}
          keyExtractor={(item) => "#" + item.name}
          data={buttons}
          renderItem={renderItem}
          numColumns={2}
          scrollEnabled={scroll}
          style={styles.cardContainer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.05,
    marginHorizontal: 15,
  },
  cardContainer: {
    marginLeft: -2,
  },
  homeHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0.4 * width,
    justifyContent: "space-between",
  },
  createRouteContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    height: 145,
    marginTop: 10,
    marginBottom: 30,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
  createRouteFont: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "500",
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bodyFonts: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
  titleFonts: {
    fontSize: 17,
    fontWeight: "700",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  map: {
    marginVertical: 10,
    width: width * 0.9,
    height: height * 0.21,
  },
});

export default Home;
