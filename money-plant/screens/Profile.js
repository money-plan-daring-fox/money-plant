// React
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { BlurView } from "expo-blur";
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
import db from "../api/firebase";
// Drawer
import NavigationDrawerStructure from "../components/NavigationDrawerStructure";
import Carousel from "react-native-snap-carousel";

const Profile = props => {
  const [state, setState] = useState("view");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [balanceDatabase, setBalanceDatabase] = useState(0);
  const [totalPlant, setTotalPlant] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [uid, setUid] = useState("");
  const [concurrent, setConcurrent] = useState(0);
  const [changeIncome, setChangeIncome] = useState(income)
  const [id, setId] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalCompletedPlant, setTotalCompletedPlant] = useState(0);
  const [entries, setEntries] = useState([
    {
      url:
        "https://cdn.dribbble.com/users/1632728/screenshots/4693038/profilepic_dribbble.gif"
    },
    {
      url:
        "https://cdn.dribbble.com/users/2764754/screenshots/5507524/dribbblemichael2.gif"
    },
    {
      url:
        "https://cdn.dribbble.com/users/1252358/screenshots/2923669/one-man-punch.gif"
    }
  ]);

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

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").width,
          alignItems: "center"
        }}
      >
        <>
          {totalCompletedPlant < 1 && index === 1 ? (
            <Image
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{ uri: item.url }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2,
                position: "absolute"
              }}
            />
          ) : totalCompletedPlant < 2 && index === 2 ? (
            <Image
              onLoadEnd={() => setLoading(false)}
              source={{ uri: item.url }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2,
                position: "absolute"
              }}
            />
          ) : (
                <Image
                  onLoadEnd={() => setLoading(false)}
                  source={{ uri: item.url }}
                  style={{
                    width: "90%",
                    height: "90%",
                    opacity: item.opacity,
                    borderRadius: (Dimensions.get("window").width * 0.9) / 2,
                    position: "absolute"
                  }}
                />
              )}

          <View style={{ justifyContent: "center" }}>
            {totalCompletedPlant < 1 && index === 1 ? (
              <Image
                source={{
                  uri: "https://img.icons8.com/ios/344/lock-filled.png"
                }}
                style={{
                  marginTop: 50,
                  width: 100,
                  height: 100,
                  position: "relative"
                }}
              />
            ) : totalCompletedPlant < 2 && index === 2 ? (
              <Image
                source={{
                  uri: "https://img.icons8.com/ios/344/lock-filled.png"
                }}
                style={{
                  marginTop: 50,
                  width: 100,
                  height: 100,
                  position: "relative"
                }}
              />
            ) : null}
          </View>
        </>
      </View>
    );
  };

  function handleTopup() {
    setModalVisible(false);

    user.balance = Number(balance) + Number(balanceDatabase);
    AsyncStorage.setItem("balance", user.balance.toString());

    db.firestore()
      .collection("users")
      .doc(id)
      .set(user)
      .then(response => {
        alert("your balance has successfully been updated");
      })
      .catch(err => {
        console.log("eh err mas ah enak");
      });
  }

  function submitChangeIncome() {
    db.firestore()
      .collection('users')
      .doc(id)
      .update({
        income: Number(changeIncome)
      })
      .then(() => {
        setState("view")
      })
      .catch(err => {
        console.log("error submit change income")
      })
  }

  const onPress = data => setCards({ data });

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem("email"),
      AsyncStorage.getItem("uid"),
      AsyncStorage.getItem("name")
    ])
      .then(([email, uid, name]) => {
        setEmail(email);
        setUid(uid);
        setName(name);
        return uid;
      })
      .then(uid => {
        db.firestore()
          .collection("users")
          .where("uid", "==", uid)
          .onSnapshot(docs => {
            docs.forEach(el => {
              setId(el.id);
              setName(el.data().name);
              setBalanceDatabase(el.data().balance);
              setUser(el.data());
              setEmail(el.data().email);
              setIncome(el.data().income);
            });
          });

        db.firestore()
          .collection("plants")
          .where("uid", "==", uid)
          .onSnapshot(async docs => {
            let plantStatistics = 0;
            docs.forEach(el => {
              if (el.data().completed === true) {
                plantStatistics += 1;
              }
            });
            await setTotalCompletedPlant(plantStatistics);
            await setLoading(false);
          });
      });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#31422e",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.text}>Hello,</Text>
        <Text style={styles.header}>{name}</Text>
      </View>
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").width,
          alignItems: "center"
        }}
      >
        <View
          style={{
            marginVertical: 15,
            height: Dimensions.get("window").height / 2.3
          }}
        >
          {loading && (
            <View style={{ ...styles.container }}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={entries}
            renderItem={renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            layout="stack"
          />
        </View>

        <View
          style={{
            backgroundColor: "#31422e",
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
            <Text style={{ ...styles.sub, paddingBottom: 5 }}>
              {" "}
              Monthly Income{" "}
            </Text>
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
                  // value={income}
                  placeholderTextColor="#f6f4f2"
                  keyboardType="numeric"
                  onChangeText={text => setChangeIncome(text)}
                />
              ) : (
                  <Text style={styles.value}>
                    {parseInt(income).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </Text>
                )}
              {state === "edit" ? (
                <TouchableOpacity style={{ ...styles.submitButton, marginLeft: 5 }}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={styles.text} onPress={() => {
                      submitChangeIncome()
                      console.log(changeIncome)
                    }}>
                      SUBMIT
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity style={{ ...styles.editButton, marginLeft: 5 }}>
                    <View>
                      <Text style={{ ...styles.text, color: "#262525" }} onPress={() => setState("edit")}>
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
          <Text style={{ ...styles.valueHeader, textAlign: "center" }}>
            {" "}
            {balanceDatabase.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Text>
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
              id="amount"
              style={styles.input}
              onChangeText={text => setBalance(text)}
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
                  wrapStyle={{ height: 100 }}
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
              onPress={() => handleTopup()}
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
    backgroundColor: "#31422e",
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
    borderRadius: 5,
    width: 200,
    alignSelf: "center"
  },
  editButton: {
    backgroundColor: "#65a1ad",
    paddingVertical: 5,
    borderRadius: 5,
    width: 70
  },
  submitButton: {
    backgroundColor: "#65a1ad",
    paddingVertical: 5,
    borderRadius: 5,
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
  headerLeft: (
    <View style={{ marginLeft: 15 }}>
      <NavigationDrawerStructure navigationProps={props.navigation} />
    </View>
  )
});

export default Profile;
