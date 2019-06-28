import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const Plant = props => {
  const [touched, setTouched] = useState([]);
  const [progress, setProgress] = useState(0);

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontFamily: "PingFangHK-Thin", color: "white" }}>
          saving for :
        </Text>
        <Text
          style={{
            fontFamily: "PingFangHK-Thin",
            color: "white",
            fontSize: 40
          }}
        >
          IPhone X
        </Text>
        <Text
          style={{
            fontFamily: "PingFangHK-Thin",
            color: "white",
            fontSize: 14,
            paddingVertical: 10
          }}
        >
          4 months remaining
        </Text>
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").width,
            alignItems: "center"
          }}
        >
          <Image
            source={require("../assets/plantgrow.gif")}
            style={{
              width: "90%",
              height: "90%",
              borderRadius: (Dimensions.get("window").width * 0.9) / 2
            }}
          />
          <Progress.Bar progress={progress} width={200} style={{marginTop : 10}} borderColor="#fff" animated={true} color="#9dddd9" />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setProgress(progress + 0.3)}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text style={styles.text}>WATER ME</Text>
            <Entypo
              name="water"
              size={15}
              color="cyan"
              style={{ paddingLeft: 15 }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.button,
            marginTop: 10,
            backgroundColor: "#ffd02c"
          }}
          onPress={() => setTouched([...touched, "ah lagi"])}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <Text style={{ ...styles.text, color: "black" }}>ABORT SAVING</Text>
            <MaterialCommunityIcons
              name="water-off"
              size={20}
              color="#b9523e"
              style={{ paddingLeft: 15 }}
            />
          </View>
        </TouchableOpacity>
        {/* 
        <TouchableHighlight onPress={() => setTouched([...touched, "ah lagi"])}>
          <Text>delete me mas</Text>
        </TouchableHighlight> */}

        <Text>{JSON.stringify(touched)}</Text>
      </View>
    </>
  );
};

Plant.navigationOptions = props => ({
  title: "Saving Detail",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#587e5b"
  }
});

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#587e5b",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#b9523e",
    paddingVertical: 15,
    borderRadius: 30,
    width: 200
  },
  text: {
    fontFamily: "PingFangHK-Medium",
    textAlign: "center",
    color: "#fff"
  }
};

export default Plant;
