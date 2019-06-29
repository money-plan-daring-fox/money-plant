// React
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  Foundation
} from "@expo/vector-icons";

// Drawer
import NavigationDrawerStructure from "../components/NavigationDrawerStructure";

const Profile = props => {
  const [state, setState] = useState("view");
  const [value, setValue] = useState(0);
  const [income, setIncome] = useState("10.000.000");
  const [modalVisible, setModalVisible] = useState(false);
  const radio_props = [
    {
      label: <FontAwesome name="cc-visa" key={1} size={30} color="#fff" />,
      value: "visa"
    },
    {
      label: (
        <FontAwesome name="cc-mastercard" key={3} size={30} color="#fff" />
      ),
      value: "mastercard",
      color: "#fff"
    },
    {
      label: <Foundation name="paypal" key={2} size={30} color="#fff" />,
      value: "paypal"
    }
  ];

  const onPress = data => setCards({ data });

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#587e5b",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 10
        }}
      >
        <Text style={styles.text}>Hello,</Text>
        <Text style={styles.header}>Mohammad Yusuf</Text>
      </View>
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").width,
          alignItems: "center"
        }}
      >
        <Image
          source={{
            uri: "https://avatars2.githubusercontent.com/u/46883609?s=460&v=4"
          }}
          style={{
            width: "90%",
            height: "90%",
            borderRadius: (Dimensions.get("window").width * 0.9) / 2
          }}
        />
        <View
          style={{
            backgroundColor: "#587e5b",
            paddingVertical: 10,
            paddingHorizontal: 10,
            alignSelf: "flex-start"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={styles.text}>Settings</Text>
            <AntDesign
              style={{ paddingLeft: 5 }}
              name="setting"
              size={12}
              color="#fff"
            />
            <Text style={styles.text}> : </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.sub}> Monthly Income </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {state === "edit" ? (
                <TextInput
                  style={styles.input}
                  placeholder="Input Income"
                  placeholderTextColor="#f6f4f2"
                />
              ) : (
                <Text style={styles.value}> {income} </Text>
              )}
              {state === "edit" ? (
                <TouchableOpacity style={styles.submitButton}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={styles.text} onPress={() => setState("view")}>
                      SUBMIT
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.editButton}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={styles.text} onPress={() => setState("edit")}>
                      EDIT
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "baseline"
            }}
          >
            <Text style={styles.sub}> Total Plants : </Text>
            <Text style={styles.value}> 5 </Text>
          </View>
        </View>
        <View>
          <Text style={styles.sub}> Balance : </Text>
          <Text style={styles.valueHeader}> Rp. 2.000.000,-</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                flexDirection: "row"
              }}
            >
              <Text style={styles.text}>TOP UP</Text>
            </View>
          </TouchableOpacity>
        </View>
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
            <Text style={styles.sub}>Input Amount :</Text>
            <TextInput
              textAlign={"center"}
              placeholderTextColor="rgba(255,255,255,0.7)"
              id="password"
              style={styles.input}
            />
            <View style={{ paddingVertical: 10, alignSelf: "center" }}>
              <Text style={{ ...styles.sub, textAlign: "center" }}>
                Payment Method :
              </Text>
              <View
                style={{
                  paddingVertical: 15
                }}
              >
                <RadioForm
                  radio_props={radio_props}
                  wrapStyle={{height : 100}}
                
                  initial={0}
                  formHorizontal={false}
                  labelHorizontal={true}
                  buttonColor={"#fff"}
                  selectedButtonColor={"#fff"}
                  animation={true}
                  labelStyle={{ color: "#fff", paddingTop: 10 }}
                  buttonSize={20}
                  buttonWrapStyle={{ marginLeft: 10 }}
                  onPress={value => {
                    setValue(value);
                  }}
                />
              </View>
              <TextInput
                  style={styles.input}
                  placeholder="Card Number"
                  placeholderTextColor="#f6f4f2"
                />
                <TextInput
                  style={styles.input}
                  placeholder="CVV"
                  placeholderTextColor="#f6f4f2"
                />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ ...styles.text, textAlign: "center" }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#587e5b",
    alignItems: "center"
  },
  text: { fontFamily: "PingFangHK-Light", fontSize: 12, color: "#f6f4f2" },
  value: { fontFamily: "PingFangHK-Regular", fontSize: 14, color: "#ffd02c" },
  header: { fontFamily: "PingFangHK-Thin", fontSize: 36, color: "#f6f4f2" },
  valueHeader: {
    fontFamily: "PingFangHK-Thin",
    fontSize: 36,
    color: "#ffd02c"
  },
  sub: { fontFamily: "PingFangHK-Thin", fontSize: 20, color: "#f6f4f2" },
  button: {
    backgroundColor: "#b9523e",
    paddingVertical: 10,
    borderRadius: 30,
    width: 200,
    alignSelf: "center"
  },
  editButton: {
    backgroundColor: "#b9523e",
    paddingVertical: 5,
    borderRadius: 30,
    width: 50
  },
  submitButton: {
    backgroundColor: "#b9523e",
    paddingVertical: 5,
    borderRadius: 30,
    width: 70
  },
  input: {
    height: 30,
    width: 200,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#FFF",
    borderRadius: 10
  }
};

Profile.navigationOptions = props => ({
  title: "My Profile",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#587e5b"
  },
  headerLeft: <NavigationDrawerStructure navigationProps={props.navigation} />
});

export default Profile;
