import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import NumberFormat from 'react-number-format'
const PlantList = ({ props, item }) => {
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
            width: 180,
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
              paddingTop: 10
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
            width: 180,
            justifyContent: "center",
            alignItems: "center",
            padding: 15
          }}
          onPress={() => props.navigation.navigate("Plant")}
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
          <Image
            style={{ height: "100%", width: "100%", flex: 3 }}
            resizeMode="contain"
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/avatar%2Fplants-vector-free-icon-set-21.png?alt=media&token=ee490201-09a9-4c6f-ae12-d252ed6b2c02"
            }}
            onLoadEnd={() => setLoading(false)}
          />
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
          <Text
            style={{
              textTransform: "uppercase",
              fontFamily: "MachineGunk"
            }}
          >
            Remaining
          </Text>
          <Text
            style={{
              fontFamily: "MachineGunk",
              flex: 1
            }}
          >
            Rp. {(item.price - item.invest).toLocaleString()}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlantList;
