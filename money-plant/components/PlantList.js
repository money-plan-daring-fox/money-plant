import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
// import NumberFormat from 'react-number-format'
const PlantList = ({ props, item }) => {
  const [income, setIncome] = useState(0);
  const [progressColorStyle, setProgressColorStyle] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("income").then(incomeKu => {
      console.log("income", incomeKu);
      setIncome(incomeKu);
    });
    console.log(item.invested / item.price,'=====');
    
    +item.invested / +item.price <= 0.4 ? setProgressColorStyle("#ea4c89")
      : +item.invested / +item.price <= 0.6 ? setProgressColorStyle("#ffd02c")
        : +item.invested / +item.price <= 1 ? setProgressColorStyle("#9dddd9") : null
  }, [item]);

  // item.invested = 9100000

  const [loading, setLoading] = useState(true);
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
      {item === "add" && (
        <TouchableOpacity
          style={{
            border: 6,
            borderRadius: 10,
            borderWidth: 1.25,
            borderStyle: "dashed",
            borderColor: "#f6f4f2",
            backgroundColor: "none",
            height: 252,
            width: Dimensions.get("window").width / 2.3,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => props.navigation.navigate("NewPlant")}
        >
          <View
            style={{
              borderColor: "#f6f4f2",
              border: 6,
              borderWidth: 1.25,
              borderStyle: "dashed",
              width: 50,
              height: 50,
              borderRadius: Dimensions.get("window").width / 2,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Ionicons name="md-add" size={15} color="#f6f4f2" />
          </View>
          <Text
            style={{
              fontFamily: "MachineGunk",
              textAlign: "center",
              color: "#fff",
              paddingTop: 20
            }}
          >
            Plant new seed!
          </Text>
        </TouchableOpacity>
      )}
      {item.name && (
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
            height: 252,
            width: Dimensions.get("window").width / 2.3,
            justifyContent: "center",
            alignItems: "center",
            padding: 15
          }}
          onPress={() => props.navigation.navigate("Plant", { item })}
        >
          <Text
            style={{
              textTransform: "uppercase",
              fontFamily: "MachineGunk",
              flex: 1
            }}
          >
            {item.name}
          </Text>
          <Progress.Bar
            progress={item.invested / item.price}
            width={110}
            style={{ marginBottom: 10 }}
            borderColor="black"
            animated={true}
            color={progressColorStyle}
          />
          <Text
            style={{
              textTransform: "uppercase",
              fontFamily: "MachineGunk",
              flex: 1
            }}
          >
            Rp.
            {parseInt(item.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Text>
          {/* <Image
            style={{ height: "100%", width: "100%", flex: 3 }}
            resizeMode="contain"
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-21.png?alt=media&token=ee490201-09a9-4c6f-ae12-d252ed6b2c02"
            }}
            onLoadEnd={() => setLoading(false)}
          /> */}
          {item.invested / item.price <= 0.2 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-32.png?alt=media&token=b72a980e-6307-4e51-bf7a-aaebcdd0a5c3"
              }}
              style={{ height: "100%", width: "100%", flex: 3 }}
              resizeMode="contain"
              onLoadEnd={() => setLoading(false)}
            />
          ) : item.invested / item.price <= 0.4 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-25.png?alt=media&token=655692b9-6b16-4b6a-b8e8-b8354404561d"
              }}
              style={{ height: "100%", width: "100%", flex: 3 }}
              resizeMode="contain"
              onLoadEnd={() => setLoading(false)}
            />
          ) : item.invested / item.price <= 0.6 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-21.png?alt=media&token=ee490201-09a9-4c6f-ae12-d252ed6b2c02"
              }}
              style={{ height: "100%", width: "100%", flex: 3 }}
              resizeMode="contain"
              onLoadEnd={() => setLoading(false)}
            />
          ) : item.invested / item.price <= 0.8 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-38.png?alt=media&token=8986e16c-7db5-4e37-adb0-9c580bc34bac"
              }}
              style={{ height: "100%", width: "100%", flex: 3 }}
              resizeMode="contain"
              onLoadEnd={() => setLoading(false)}
            />
          ) : item.invested / item.price < 1 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-29.png?alt=media&token=c1ddcda5-0a98-4c5f-aa80-1d6cfdd47a65"
              }}
              style={{ height: "100%", width: "100%", flex: 3 }}
              resizeMode="contain"
              onLoadEnd={() => setLoading(false)}
            />
          ) : item.invested / item.price >= 1 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-29.png?alt=media&token=c1ddcda5-0a98-4c5f-aa80-1d6cfdd47a65"
              }}
              style={{ height: "100%", width: "100%", flex: 3 }}
              resizeMode="contain"
              onLoadEnd={() => setLoading(false)}
            />
          ) : null}
          {loading && (
            <View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                opacity: 0.7,
                backgroundColor: "#31422e",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ActivityIndicator
                size="small"
                color="#ffd02c"
                animating={loading}
              />
            </View>
          )}
          {
            !item.completed &&
            <Text
              style={{
                textTransform: "uppercase",
                fontFamily: "MachineGunk"
              }}
            >
              Remaining
            </Text>
          }
          {item.plan === "default" && item.completed === false &&
            income * 0.2 <= item.price - item.invested && (
              <Text style={{ fontFamily: "MachineGunk", flex: 1 }}>
                {Math.ceil((item.price - item.invested) / (income * 0.2))}
                {" "} months
              </Text>
            )}
          {item.plan === "default" && item.completed === false &&
            income * 0.2 > item.price - item.invested && (
              <Text style={{ fontFamily: "MachineGunk", flex: 1 }}>
                {Math.floor(
                  (new Date() - item.createdAt.toDate()) / (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </Text>
            )}
          {item.plan === "money" && item.completed === false &&
            item.investing <= item.price - item.invested && (
              <Text style={{ fontFamily: "MachineGunk", flex: 1 }}>
                {Math.ceil((item.price - item.invested) / item.investing)}
                {" "} months
              </Text>
            )}
          {item.plan === "money" && item.completed === false &&
            item.investing > item.price - item.invested && (
              <Text style={{ fontFamily: "MachineGunk", flex: 1 }}>
                {Math.floor(
                  (new Date() - item.createdAt.toDate()) / (1000 * 60 * 60 * 24)
                )}
                {" "} days
              </Text>
            )}
          {item.plan === "month" && item.completed === false &&
            item.dueDate &&
            Math.floor(
              (item.dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)
            ) >= 30 && (
              <Text style={{ fontFamily: "MachineGunk", flex: 1 }}>
                {Math.floor(
                  (item.dueDate.toDate() - new Date()) /
                  (1000 * 60 * 60 * 24) /
                  30
                )}
                {" "} months
              </Text>
            )}
          {item.plan === "month" && item.completed === false &&
            item.dueDate &&
            Math.floor(
              (item.dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)
            ) < 30 && (
              <Text style={{ fontFamily: "MachineGunk", flex: 1 }}>
                {Math.floor(
                  (item.dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)
                )}
                {" "} days
              </Text>
            )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlantList;
