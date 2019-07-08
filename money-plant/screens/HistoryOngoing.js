// React
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground
} from "react-native";

// Components
import NavigationDrawerStructure from "../components/NavigationDrawerStructure";

// Firebase
import db from "../api/firebase";

// Moment.js
import Moment from "moment";

const HistoryOngoing = props => {
  useEffect(() => {
    getUID();
  });

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUID = async () => {
    try {
      let uid = await AsyncStorage.getItem("uid");
      db.firestore()
        .collection("plants")
        .where("uid", "==", uid)
        .where("completed", "==", false)
        .get()
        .then(data => {
          let arr = [];
          data.forEach(item => {
            let obj = item.data();
            obj.id = item.id;
            if (obj.plan === "default") obj.plan = "Almond";
            if (obj.plan === "money") obj.plan = "Bloom";
            if (obj.plan === "month") obj.plan = "Cactus";
            arr.push(obj);
          });
          setPlants(arr);
          setLoading(false);
        })
        .catch(err => {
          alert(err.toString());
          setLoading(false);
        });
    } catch (err) {
      alert(err.toString());
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#31422e" }}>
      {loading ? (
        <View
          style={{
            height: Dimensions.get("window").width,
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : !loading && plants.length > 0 ? (
        <>
          <FlatList
            style={{ padding: 12.5, backgroundColor: "#31422e" }}
            data={plants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    padding: 5,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    borderRadius: 5,
                    marginVertical: 5
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#31422e",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      backgroundColor: "#f2f2d9",
                      width: "100%",
                      height: 180,
                      justifyContent: "center",
                      alignItems: "center",
                      // padding: 15,
                      flexDirection: "row"
                    }}
                    onPress={() =>
                      props.navigation.navigate("HistoryDetails", { item })
                    }
                  >
                    <View
                      style={{
                        flex: 1.5 /* backgroundColor: 'cornflowerblue' */
                      }}
                    >
                      <Image
                        style={{ height: "100%", width: "100%" }}
                        // {uri: 'https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-21.png?alt=media&token=ee490201-09a9-4c6f-ae12-d252ed6b2c02' }
                        resizeMode="contain"
                        source={
                          item.invested / item.price <= 0.2
                            ? {
                                uri:
                                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-32.png?alt=media&token=b72a980e-6307-4e51-bf7a-aaebcdd0a5c3"
                              }
                            : item.invested / item.price <= 0.4
                            ? {
                                uri:
                                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-25.png?alt=media&token=655692b9-6b16-4b6a-b8e8-b8354404561d"
                              }
                            : item.invested / item.price <= 0.6
                            ? {
                                uri:
                                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-21.png?alt=media&token=ee490201-09a9-4c6f-ae12-d252ed6b2c02"
                              }
                            : item.invested / item.price <= 0.8
                            ? {
                                uri:
                                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-38.png?alt=media&token=8986e16c-7db5-4e37-adb0-9c580bc34bac"
                              }
                            : item.invested / item.price <= 1
                            ? {
                                uri:
                                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-29.png?alt=media&token=c1ddcda5-0a98-4c5f-aa80-1d6cfdd47a65"
                              }
                            : {
                                uri:
                                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-29.png?alt=media&token=c1ddcda5-0a98-4c5f-aa80-1d6cfdd47a65"
                              }
                        }
                      />
                    </View>

                    <View
                      style={{
                        flex: 3.5,
                        padding: 15 /* backgroundColor: 'aquamarine' */
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1.5,
                          justifyContent: "space-between",
                          alignSelf: "baseline"
                        }}
                      >
                        <Text
                          style={{
                            textTransform: "uppercase",
                            fontFamily: "PingFangHK-Medium",
                            flex: 1.5,
                            textAlign: "center",
                            fontSize: 20,
                            fontWeight: "700"
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>

                      <Text style={{ color: "#666666", fontWeight: "500", fontFamily : "PingFangHK-Light"}}>
                        Planted: {Moment(Date(item.createdAt)).format("ll")}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "PingFangHK-Regular",
                          flex: 1
                        }}
                      >
                        Price:{" "}
                        <Text style={{ color: "#cfb53b", fontFamily : "PingFangHK-Regular" }}>
                          Rp. {item.price.toLocaleString()}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontFamily: "PingFangHK-Regular",
                          flex: 1
                        }}
                      >
                        Expense / month:{" "}
                        <Text style={{ color: "#65a1ad", fontFamily : "PingFangHK-Regular" }}>
                          Rp. {item.investing.toLocaleString()}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontFamily: "PingFangHK-Regular",
                          flex: 1
                        }}
                      >
                        Invested:{" "}
                        <Text style={{ color: "#587e5b", fontFamily : "PingFangHK-Regular" }}>
                          Rp. {item.invested.toLocaleString()}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontFamily: "PingFangHK-Regular",
                          flex: 1
                        }}
                      >
                        Plan:
                        <Text style={{ textTransform: "uppercase", fontFamily: "PingFangHK-Regular" }}>
                          {" "}
                          {item.plan}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          fontFamily: "PingFangHK-Regular",
                          flex: 1
                        }}
                      >
                        Deadline:{" "}
                        <Text style={{ color: "#b9523e", fontFamily : "PingFangHK-Regular" }}>
                          {item.deadline}
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </>
      ) : (
        <View
          style={{
            height: Dimensions.get("window").width,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontFamily: "PingFangHK-Light" }}>
            Your list is empty, grow some plants in the garden.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

HistoryOngoing.navigationOptions = props => ({
  title: "Ongoing",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#587E5B"
  },
  headerLeft: (
    <View style={{ marginLeft: 15 }}>
      <NavigationDrawerStructure navigationProps={props.navigation} />
    </View>
  )
});

export default HistoryOngoing;
