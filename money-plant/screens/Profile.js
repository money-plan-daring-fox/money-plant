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
  AsyncStorage
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
import db from "../api/firebase";
// Drawer
import NavigationDrawerStructure from "../components/NavigationDrawerStructure";

const Profile = props => {
  const [state, setState] = useState("view");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(0);
  const [income, setIncome] = useState(0);
  const [balance, setBalance] = useState(0);
  const [balanceDatabase, setBalanceDatabase] = useState(0)
  const [totalPlant, setTotalPlant] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
const [uid, setUid] = useState("")
const [concurrent, setConcurrent] = useState(0)
const [id, setId] = useState("")
const [user, setUser] = useState({})

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

  function handleTopup() {
    setModalVisible(false)
    // console.log("aku disini gengs")
    // console.log({uid})
    // console.log("aku disini gengs")

    // console.log("AKU KUMPULAN KONSOL==========")
    // console.log({id})
    // console.log({balance});
    // console.log({balanceDatabase});
    // console.log("AKU KUMPULAN KONSOL==========")
    
    console.log("tetew")
    console.log(balance)
    console.log(balanceDatabase)

    user.balance = Number(balance) + Number(balanceDatabase)

    db.firestore()
    .collection('users')
    .doc(id)
    .set(user)
    .then(response => {
      // console.log("handlletopup suskes uy")
      // console.log(response)
      alert("your balance has successfully been updated")
    })
    .catch(err => {
      console.log("eh err mas ah enak")
    })

  }

  const onPress = data => setCards({ data });

  useEffect(() => {
    Promise.all([AsyncStorage.getItem("email"), AsyncStorage.getItem("uid")])
    .then(([email, uid]) => {
      setEmail(email)
      setUid(uid)
      console.log("ini uid")
      console.log(uid)
      console.log("ini uid")

      return uid
    })
    .then(uid => {
      console.log('ini uid setelah then', uid)
      db.firestore()
      .collection("users")
      .where('uid', '==', uid)
      .onSnapshot(docs => {
        console.log("udah masuk firestore nih hehe")
        docs.forEach(el => {
          setId(el.id)
          setBalanceDatabase(el.data().balance)
          setUser(el.data())
          setEmail(el.data().email)
          setIncome(el.data().income)
        })
      })
    })
    



    // .then(e => {
//       setEmail(e);
//     });

//         .then(e => {
//           setUid(e)
//           db.firestore()
//           .collection("users")
//           .where("uid", '==', uid)
//           .onSnapshot(docs => {
//             // console.log("aku si katanya balance")
// // console.log(data.balance)
//             // console.log("aku si katanya balance")
//             // console.log('hai aku id');
//             docs.forEach(el => {
//               console.log("aku foreach")
//               console.log(el.id)
//               setId(el.id)
//               console.log("aku foreach")
//               setBalanceDatabase(el.data().balance)
//             })
//             // console.log(data.id)
//             // setId(data.id)
//             // setBalanceDatabase(data.balance)
//         })

//       })
  }, []);

  // db.firestore()
  //   .collection("users")
  //   .where("email", "==", email)
  //   .get()
  //   .then(data => {
  //     data.forEach(async item => {
  //       const { balance, email, income } = item.data();
  //       setBalance(balance);
  //       setEmail(email);
  //       setIncome(income);
  //       // setUser()
  //       // console.log(item.data(), "===========");
  //     });
  //   });

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
        <Text style={styles.header}>{email}</Text>
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
          <View style={{ flexDirection: "row", alignItems: "baseline"}}>
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
            <Text style={{...styles.sub, paddingBottom : 5}}> Monthly Income </Text>
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
                <Text style={styles.value}>
                  {parseInt(income).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </Text>
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
                <TouchableOpacity style={{...styles.editButton, marginLeft : 5}}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      flexDirection: "row",
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
              onChangeText={(text) => setBalance(text)}
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
  headerLeft: (
    <View style={{ marginLeft: 15 }}>
      <NavigationDrawerStructure navigationProps={props.navigation} />
    </View>
  )
});

export default Profile;
