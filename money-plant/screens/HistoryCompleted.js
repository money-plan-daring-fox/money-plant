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
  Image
} from "react-native";

// Components
import NavigationDrawerStructure from "../components/NavigationDrawerStructure";

// Firebase
import db from "../api/firebase";

const HistoryCompleted = props => {
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
        .where("completed", "==", true)
        .get()
        .then(data => {
          let arr = [];
          data.forEach(item => {
            let obj = item.data();
            obj.id = item.id;
            if(obj.plan === 'default') obj.plan = "Almond"
            if(obj.plan === "money") obj.plan = "Bloom"
            if(obj.plan === 'month') obj.plan = "Cactus"
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
                  backgroundColor: "rgba(255,255,255,0.7)"
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
                    height: 160,
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
                      resizeMode="contain"
                      source={{
                        uri:
                          "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-29.png?alt=media&token=c1ddcda5-0a98-4c5f-aa80-1d6cfdd47a65"
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3.5,
                      padding: 15 /* backgroundColor: 'aquamarine' */
                    }}
                  >
                    <Text
                      style={{
                        textTransform: "uppercase",
                        // fontFamily: "Trebuchet MS",
                        flex: 1.5,
                        fontSize: "20",
                        fontWeight: "700"
                      }}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flex: 2,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignSelf: "center",
                        width: "100%"
                      }}
                    >
                      <Image
                        source={{
                          uri:
                            "https://img.icons8.com/bubbles/50/000000/money-bag.png"
                        }}
                        style={{ width: 40, height: 40 }}
                      />
                      <Text
                        style={{
                          color: "#cfb53b",
                          marginLeft: 10,
                          paddingTop: 10
                        }}
                      >
                        Rp. {item.price.toLocaleString()}
                      </Text>
                    </View>
                    <Text
                      style={{
                        flex: 1
                      }}
                    >
                      Plan:{" "}
                      <Text style={{ textTransform: "uppercase", color : "#b9523e" }}>
                        {item.plan}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        flex: 1
                      }}
                    >
                      Planted:{" "}
                      <Text style={{color : "#666666", fontWeight : "500"}}>
                        {new Date(
                          Number(
                            item.createdAt.seconds +
                              String(item.createdAt.nanoseconds / 1e6)
                          )
                        ).toDateString()}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            height: Dimensions.get("window").width,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white" }}>
            Your list is empty, grow some plants in the garden.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

HistoryCompleted.navigationOptions = props => ({
  title: "Completed",
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

export default HistoryCompleted;
