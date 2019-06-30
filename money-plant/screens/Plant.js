import React, { useState, useEffect } from "react";
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
import SelectInput from "react-native-select-input-ios";
import { Tooltip, Text as ToolText } from "react-native-elements";
import { Feather, EvilIcons, Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const Plant = props => {
  let {
    name,
    price,
    deadline,
    invested,
    investing,
    plan
  } = props.navigation.getParam("item");

  const [touched, setTouched] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editplan, setPlan] = useState(plan);
  const [options, setOptions] = useState([
    { value: 0, label: `Edit Plan : ${editplan} (current) ` },
    { value: 1, label: "Default" },
    { value: 2, label: "Month" },
    { value: 3, label: "Rp/month" }
  ]);

  const handleInputAmount = method => {
    method === "recommended"
      ? alert("proses perhitungan recommended dijalankan yaaa ")
      : alert("proses perhitungan input manual dijalankan guyss");
  };

  const handleSubmit = val => {
    if (val !== 0) {
      setPlan(options[val].label);
      setOptions([
        { value: 0, label: `Edit Plan : ${options[val].label} (current) ` },
        { value: 1, label: "Default" },
        { value: 2, label: "Month" },
        { value: 3, label: "Rp/month" }
      ]);
    }

    //JALANIN PROSES PERHITUNGAN DISINI
  };
  invested = 20;
  console.log(invested / price);
  console.log(invested);
  console.log(price);

  return (
    <>
      <View style={styles.container}>
        <View style={{ alignSelf: "flex-end", paddingRight: 10 }}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => alert(`Are You Sure To Kill ${name}? 😭`)}
          >
            <Text style={styles.text}>
              Delete <Feather name="x-circle" size={13} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
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
          {deadline} months left
        </Text>
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").width,
            alignItems: "center"
          }}
        >
          {invested / price <= 0.2 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/stage1speed.gif?alt=media&token=33b4c5e6-d0ec-4f50-887b-b6e0014a8ab0"
              }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : invested / price <= 0.4 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/stage2.gif?alt=media&token=dd650c8d-5c88-448d-9972-5dba4a98b839"
              }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : invested / price <= 0.6 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/stage3.gif?alt=media&token=f303186f-126b-4ed6-959c-36ba81bcb30e"
              }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : invested / price <= 0.8 ? (
            <Image
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/stage4.gif?alt=media&token=69e4989a-7c83-4321-9c7c-b7ebe4bdb0df"
              }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : invested / price <= 1 ? (
            <Image
              source={{uri : "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/stage5speed.gif?alt=media&token=e8fa0eaa-12eb-47d8-897e-84487b6698ba"}}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : null}

          <Progress.Bar
            progress={invested / price}
            width={200}
            style={{ marginTop: 10 }}
            borderColor="#fff"
            animated={true}
            color="#9dddd9"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
            paddingVertical: 10
          }}
        >
          <Text style={styles.textBar}>Rp. {invested.toLocaleString()}</Text>
          <Text style={styles.textBar}> of </Text>
          <Text style={styles.textBar}>Rp. {price.toLocaleString()}</Text>
        </View>
        <Text style={styles.sub}>
          Rp. {(price - invested).toLocaleString()} more to get {name}
        </Text>
        <TouchableOpacity
          style={{ ...styles.editButton, marginVertical: 5 }}
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
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#ffd02c", marginTop: 5 }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <SelectInput
              value={options.value}
              options={options}
              labelStyle={{ ...styles.text, color: "black" }}
              onSubmitEditing={val => handleSubmit(val)}
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInputAmount("manual")}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            <Text style={{ ...styles.text, paddingTop: 20 }}> or </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-around",
                paddingBottom: 20
              }}
            >
              <TouchableOpacity
                onPress={() => handleInputAmount("recommended")}
              >
                <Text style={styles.text}> Use Recommendation Settings </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Tooltip
                  popover={
                    <ToolText>
                      Use recommended settings to allow the system calculate 20%
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
  editButton: {
    backgroundColor: "#65a1ad",
    paddingVertical: 15,
    borderRadius: 30,
    width: 200
  },
  deleteButton: {
    backgroundColor: "#b9523e",
    paddingVertical: 10,
    borderRadius: 30,
    width: 75
  },
  textBar: {
    fontFamily: "MachineGunk",
    color: "#fff"
  },
  text: {
    fontFamily: "MachineGunk",
    textAlign: "center",
    color: "#fff"
  },
  sub: { fontFamily: "MachineGunk", fontSize: 20, color: "#f6f4f2" },
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
