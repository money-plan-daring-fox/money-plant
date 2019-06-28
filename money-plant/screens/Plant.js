import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Modal,
  TextInput
} from "react-native";
import { Tooltip, Text as ToolText } from "react-native-elements";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const Plant = props => {
  const [touched, setTouched] = useState([]);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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
          <Progress.Bar
            progress={progress}
            width={200}
            style={{ marginTop: 10 }}
            borderColor="#fff"
            animated={true}
            color="#9dddd9"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}
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
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#587e5b"
          }}
        >
          <Text
            style={{
              fontFamily: "PingFangHK-Light",
              textAlign: "center",
              color: "#fff",
              paddingVertical: 10
            }}
          >
            Input Amount :
          </Text>
          <TextInput
            textAlign={"center"}
            placeholderTextColor="rgba(255,255,255,0.7)"
            id="password"
            style={styles.input}
          />
          <Text style={styles.text}> or </Text>
          <View style={{ flexDirection: "row", alignItems : "baseline", justifyContent: "space-around" }}>
            <Text style={styles.text}> Use Recommendation Settings </Text>
            <Tooltip
              popover={
                <ToolText>
                  Use recommended settings to allow the system calculate 10% of
                  your salary as your savings value
                </ToolText>
              }
              height={100}
              width={300}
              backgroundColor="#ffd02c"
            >
              <EvilIcons name="question" size={20} style={{color : "white" }} />
            </Tooltip>
          </View>
        </View>
      </Modal>
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
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    borderRadius: 10,
    fontSize: 20
  }
};

export default Plant;
