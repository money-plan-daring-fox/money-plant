import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Modal,
  TextInput,
  SafeAreaView
} from "react-native";
import { Tooltip, Text as ToolText } from "react-native-elements";
import { Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const Plant = (props) => {
  const [touched, setTouched] = useState([]);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

console.log('saya item uy');
 let {name, price, deadline, invested, investing, plan} = props.navigation.getParam("item")
console.log('saya item uy');

invested = 3

    
  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontFamily: "MachineGunk", color: "white" }}>
          saving for :
        </Text>
        <Text
          style={{
            fontFamily: "MachineGunk",
            color: "white",
            fontSize: 40
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: "MachineGunk",
            color: "white",
            fontSize: 14,
            paddingVertical: 10
          }}
        >
          harga barang Rp. {price}
          sisa pembayaran Rp. {price - invested}
          sudah invest berapa Rp. {invested}
          per bulannya brp Rp. {investing}
          plannya apa {plan}
          progress {invested/price}
        </Text>
        <Text
          style={{
            fontFamily: "MachineGunk",
            color: "white",
            fontSize: 14,
            paddingVertical: 10
          }}
        >
          {deadline} months remaining
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
          <SafeAreaView style={{ flex: 1, alignSelf: "flex-end" }}>
            <TouchableOpacity
              style={{ paddingHorizontal: 25 }}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons
                name="ios-close-circle-outline"
                color="#ffd02c"
                size={25}
              />
            </TouchableOpacity>
          </SafeAreaView>
          <View
            style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                fontFamily: "MachineGunk",
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-around",
                paddingBottom: 20
              }}
            >
              <Text style={styles.text}> Use Recommendation Settings </Text>
              <TouchableOpacity>
                <Tooltip
                  popover={
                    <ToolText>
                      Use recommended settings to allow the system calculate 10%
                      of your salary as your savings value
                    </ToolText>
                  }
                  height={100}
                  width={300}
                  backgroundColor="#ffd02c"
                >
                  <EvilIcons
                    name="question"
                    size={20}
                    style={{ color: "white" }}
                  />
                </Tooltip>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
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
    fontFamily: "MachineGunk",
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
