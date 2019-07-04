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
  SafeAreaView,
  AsyncStorage,
  Linking,
  Alert,
  ActivityIndicator
} from "react-native";
import { Tooltip, Text as ToolText } from "react-native-elements";
import { Feather, EvilIcons, Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import SelectInput from "react-native-select-input-ios";
import db from "../api/firebase";
import firebase from "firebase";
import axios from "axios";

const Plant = props => {
  let { id } = props.navigation.getParam("item");
  const investingProps = props.navigation.getParam("item").investing;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [deadline, setDeadline] = useState("");
  const [invested, setInvested] = useState(0);
  const [investing, setInvesting] = useState(0);
  const [plan, setCurrentPlan] = useState("");
  const [dueDate, setDueDate] = useState(undefined);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [stateid, setId] = useState("");
  const [uid, setUid] = useState("");
  const [history, setHistory] = useState("");
  const [completed, setCompleted] = useState(false);
  const [progressColorStyle, setProgressColorStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  const [investingPerMonthDatabase, setInvestingPerMonth] = useState(0);
  const [coba, setCoba] = useState("");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("id")
      .then(idKu => {
        setUserId(idKu)
        db.firestore()
          .collection("users")
          .doc(idKu)
          .onSnapshot(doc => {
            setIncome(Number(doc.data().income))
            setBalance(Number(doc.data().balance))
            setInvestingPerMonth(doc.data().totalInvestingPerMonth)
          })
      })

  })

  const handleApi = () => {
    axios
      // .get(`http://localhost:3001/users/getItemsPrice?key=${name}`)
      .get(
        `http://localhost:3001/users/getItemsPrice?key=${name}&price=${price}`
      )
      .then(({ data }) => {
        console.log(data, "===== invoked");
        Linking.openURL(data[0].url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleInputAmount = method => {
    if (amount > balance) return alert(`Amount (Rp ${amount}) entered is larger than your current balance (Rp ${balance})`)
    if (method === "recommended") {
      setAmount(income * 0.2);
    } else if (method === "manual") {
      let input = {
        name,
        price,
        plan,
        invested: invested + amount,
        createdAt,
        updatedAt: new Date(),
        stage: ((invested + amount) / price) * 5,
        uid,
        history: [
          ...history,
          { updatedAt: new Date(), invested: invested + amount }
        ],
        completed: false
      };

      if((invested + amount) > price) return alert(`Your water amount (Rp ${invested + amount}) exceeds the total price (Rp ${price})`)
      if ((invested + amount) == price) input.completed = true;

      let newDueDate = new Date();
      if (plan === "default") {
        newDueDate.setMonth(
          newDueDate.getMonth() +
            Math.ceil((price - (invested + amount)) / (income * 0.2))
        );
        input.investing = income * 0.2;
        input.deadline =
          Math.ceil((price - (invested + amount)) / (income * 0.2)) * 30;
        input.dueDate = newDueDate;
      } else if (plan === "money") {
        newDueDate.setMonth(
          newDueDate.getMonth() + (price - (invested + amount)) / investing
        );
        input.investing = investing;
        input.deadline = ((price - (invested + amount)) / investing) * 30;
        input.dueDate = newDueDate;
      } else if (plan === "month") {
        input.investing =
          (price - (invested + amount)) / Math.round(deadline / 30);
        input.dueDate = dueDate;
        input.deadline = deadline;
      }

      if (input.completed === true && input.plan !== "month") {
        db.firestore()
          .collection("plants")
          .doc(id)
          .set(input)
          .then(() => {
            setModalVisible(false);
            db.firestore()
              .collection("users")
              .doc(userId)
              .update({
                totalInvestingPerMonth: firebase.firestore.FieldValue.increment(investing * -1),
                balance: firebase.firestore.FieldValue.increment(amount * -1),
                completedPlants: firebase.firestore.FieldValue.increment(1),
                ongoingPlants: firebase.firestore.FieldValue.increment(-1)
              })
              .then(() => {
                AsyncStorage.getItem('expoToken')
                .then((expoToken) => {
                  axios
                  .post(server+'users/notifPlantComplete', {
                    toPush: {
                      expoToken,
                      item: name,
                      userUid: uid,
                      link: 'Plant',
                      data: props.navigation.getParam("item"),
                      id: userId
                    }
                  })
                  .then(data => {
                    console.log('successfully push plant-complete notif!')
                  })
                })
              })
          })
          .catch(err => {
            console.log("update error uy", err);
          });
      } else if (input.completed === false && input.plan !== "month") {
        db.firestore()
          .collection("plants")
          .doc(id)
          .set(input)
          .then(() => {
            console.log("update berhasil uy");
            setModalVisible(false);
            db.firestore()
              .collection("users")
              .doc(userId)
              .update({
                balance: firebase.firestore.FieldValue.increment(amount * -1),
              })
          })
          .catch(err => {
            console.log("update error uy", err);
          });
      } else if (input.plan === "month") {
        db.firestore()
          .collection("plants")
          .doc(id)
          .set(input)
          .then(() => {
            let toUpdate = {
                    totalInvestingPerMonth: firebase.firestore.FieldValue.increment(((price - (invested + amount)) / Math.round(deadline / 30)) - ((price - invested) / Math.round(deadline / 30))),
                    balance: firebase.firestore.FieldValue.increment(amount * -1),
                  }
            if(input.completed === true) {
              toUpdate.completedPlants = firebase.firestore.FieldValue.increment(1)
              toUpdate.ongoingPlants = firebase.firestore.FieldValue.increment(-1)
            }
                setModalVisible(false);
                db.firestore()
                  .collection("users")
                  .doc(userId)
                  .update(toUpdate)
          })
          .catch(err => {
            console.log("update error uy", err);
          });
      }
    }
  };

  useEffect(() => {
    // AsyncStorage.getItem("income").then(incomeKu => {
    //   setIncome(Number(incomeKu));
    // });

    db.firestore()
      .collection("plants")
      .doc(id)
      .onSnapshot(plant => {
        if (plant.data()) {
          setCoba({ ...plant.data(), id: plant.id });
          setName(plant.data().name);
          setPrice(Number(plant.data().price));
          setDeadline(plant.data().deadline);
          setInvested(Number(plant.data().invested));
          setInvesting(plant.data().investing);
          setCurrentPlan(plant.data().plan);
          setDueDate(plant.data().dueDate);
          setCreatedAt(plant.data().createdAt.toDate());
          setId(plant.id);
          setUid(plant.data().uid);
          setHistory(plant.data().history);
          setCompleted(plant.data().completed);
        }
      });

    invested / price <= 0.4 ? setProgressColorStyle("#ea4c89")
      : invested / price <= 0.6 ? setProgressColorStyle("#ffd02c")
        : invested / price <= 1 ? setProgressColorStyle("#9dddd9") : null
  }, [invested]);

  const deletePlant = () => {
    Alert.alert(
      `Abort Mission to Save ${name}? 😭`,
      "You can't go back once its deleted",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          style: "OK",
          text: "OK",
          onPress: () => {
            if (completed === true) {
              db.firestore()
                .collection("plants")
                .doc(id)
                .delete()
                .then(() => {
                  props.navigation.navigate("Garden");
                })
                .catch(err => {
                  console.log(err);
                });
            } else if (completed === false && plan !== "month") {
              db.firestore()
                .collection("plants")
                .doc(id)
                .delete()
                .then(() => {
                  db.firestore()
                    .collection("users")
                    .doc(userId)
                    .update({
                      totalInvestingPerMonth: firebase.firestore.FieldValue.increment(
                        Number(investing) * -1
                      ),
                      ongoingPlants: firebase.firestore.FieldValue.increment(-1),
                    })
                    .then(() => {
                      alert(`Plant has successfully deleted`);
                      props.navigation.navigate("Garden")(-Number(investing));
                    });
                })
                .catch(err => {
                  console.log(err);
                });
            } else if (completed === false && plan === "month") {
              db.firestore()
                .collection("plants")
                .doc(id)
                .delete()
                .then(() => {
                  db.firestore()
                    .collection("users")
                    .doc(userId)
                    .update({
                      totalInvestingPerMonth: firebase.firestore.FieldValue.increment(
                        Number(investing) * -1
                      ),
                      ongoingPlants: firebase.firestore.FieldValue.increment(-1),
                    })
                    .then(() => {
                      alert(`Plant has successfully deleted`);
                      props.navigation.navigate("Garden")(-Number(investing));
                    });
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <View
        style={{
          alignItems: "flex-end",
          paddingRight: 10,
          backgroundColor: "#587e5b",
          width: "100%"
        }}
      >
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deletePlant()}
        >
          <Text style={styles.text}>
            Delete <Feather name="x-circle" size={13} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={{ fontFamily: "MachineGunk", color: "white", letterSpacing : 0.5 }}>
          saving for :
        </Text>
        <Text
          style={{
            fontFamily: "MachineGunk",
            color: "white",
            fontSize: 40,
            letterSpacing : 0.5 
          }}
        >
          {name}
        </Text>

        {plan === "default" &&
          income * 0.2 <= price - invested &&
          invested / price < 1 && (
            <Text
              style={{
                fontFamily: "MachineGunk",
                color: "white",
                fontSize: 14,
                paddingVertical: 10,
                letterSpacing : 0.5 
              }}
            >
              {Math.ceil((price - invested) / (income * 0.2))} months left
            </Text>
          )}
        {plan === "default" &&
          income * 0.2 > price - invested &&
          invested / price < 1 && (
            <Text
              style={{
                fontFamily: "MachineGunk",
                color: "white",
                fontSize: 14,
                paddingVertical: 10,
                letterSpacing : 0.5 
              }}
            >
              {Math.floor((new Date() - createdAt) / (1000 * 60 * 60 * 24))}{" "}
              days left
            </Text>
          )}
        {plan === "money" &&
          investing <= price - invested &&
          invested / price < 1 && (
            <Text
              style={{
                fontFamily: "MachineGunk",
                color: "white",
                fontSize: 14,
                paddingVertical: 10
              }}
            >
              {Math.ceil((price - invested) / investing)} months 
            </Text>
          )}
        {plan === "money" &&
          investing > price - invested &&
          invested / price < 1 && (
            <Text
              style={{
                fontFamily: "MachineGunk",
                color: "white",
                fontSize: 14,
                paddingVertical: 10
              }}
            >
              {Math.floor((new Date() - createdAt) / (1000 * 60 * 60 * 24))}{" "}
              days
            </Text>
          )}
        {plan === "month" &&
          dueDate !== undefined &&
          Math.floor((dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)) >=
            30 &&
          invested / price < 1 && (
            <Text
              style={{
                fontFamily: "MachineGunk",
                color: "white",
                fontSize: 14,
                paddingVertical: 10
              }}
            >
              {Math.floor(
                (dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24) / 30
              )}{" "}
              months
            </Text>
          )}
        {plan === "month" &&
          dueDate !== undefined &&
          Math.floor((dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)) <
            30 &&
          invested / price < 1 && (
            <Text
              style={{
                fontFamily: "MachineGunk",
                color: "white",
                fontSize: 14,
                paddingVertical: 10
              }}
            >
              {Math.floor(
                (dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </Text>
          )}
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").width,
            alignItems: "center"
          }}
        >
          {loading && (
            <View
              style={{
                ...styles.container,
                marginTop: Dimensions.get("window").width / 2,
                position: "absolute"
              }}
            >
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          {invested / price <= 0.2 ? (
            <Image
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
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
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/stage3speed.gif?alt=media&token=45f871b9-7944-4229-a04e-c22707fd551e"
              }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : invested / price <= 0.6 ? (
            <Image
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/stage3speed.gif?alt=media&token=45f871b9-7944-4229-a04e-c22707fd551e"
              }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : invested / price <= 0.8 ? (
            <Image
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/stage4speed.gif?alt=media&token=a774282f-df60-4097-95a0-3ea4e7caea4e"
              }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : invested / price < 1 ? (
            <Image
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/stage5speed.gif?alt=media&token=e8fa0eaa-12eb-47d8-897e-84487b6698ba"
              }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : invested / price >= 1 ? (
            <Image
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/money-vector-free-icon-set-38.png?alt=media&token=4d78601a-4124-40e2-be63-3f6b3eb3a8fa"
              }}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: (Dimensions.get("window").width * 0.9) / 2
              }}
            />
          ) : null}

          <Progress.Bar
            progress={invested / price}
            width={300}
            height={10}
            style={{ marginTop: 10 }}
            animated={true}
            color={progressColorStyle}
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

        {plan === "default" &&
          income * 0.2 <= price - invested &&
          invested / price < 1 && (
            <Text
              style={{
                ...styles.sub,
                color: "#FFD02C",
                textDecorationLine: "underline"
              }}
            >
              Rp. {Math.round(income * 0.2).toLocaleString()}{" "}
              <Text style={styles.sub}>per month</Text>
            </Text>
          )}
        {plan === "default" &&
          income * 0.2 > price - invested &&
          invested / price < 1 && (
            <Text style={styles.sub}>
              Last watering:{" "}
              <Text
                style={{
                  ...styles.sub,
                  color: "#FFD02C",
                  textDecorationLine: "underline"
                }}
              >
                Rp {price - invested}
              </Text>
            </Text>
          )}
        {plan === "money" &&
          investing <= price - invested &&
          invested / price < 1 && (
            <Text
              style={{
                ...styles.sub,
                color: "#FFD02C",
                textDecorationLine: "underline"
              }}
            >
              Rp. {investing.toLocaleString()}{" "}
              <Text style={styles.sub}>per month</Text>
            </Text>
          )}
        {plan === "money" &&
          investing > price - invested &&
          invested / price < 1 && (
            <Text style={styles.sub}>Last watering: Rp {price - invested}</Text>
          )}
        {plan === "month" &&
          dueDate !== undefined &&
          Math.floor((dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)) >=
            30 &&
          invested / price < 1 && (
            <Text style={styles.sub}>
              Rp.{" "}
              {Math.round(
                (price - invested) /
                  Math.floor(
                    (dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24) / 30
                  )
              ).toLocaleString()}{" "}
              per month
            </Text>
          )}
        {plan === "month" &&
          dueDate !== undefined &&
          Math.floor((dueDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)) <
            30 &&
          invested / price < 1 && (
            <Text style={styles.sub}>Last watering: Rp {price - invested}</Text>
          )}
        {invested / price < 1 ? (
          <Text
            style={{
              ...styles.sub,
              color: "#FFD02C",
              textDecorationLine: "underline"
            }}
          >
            Rp. {(price - invested).toLocaleString()}{" "}
            <Text style={styles.sub}>more to get {name}</Text>
          </Text>
        ) : null}

        {invested / price < 1 ? (
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
              <Text style={{...styles.text, letterSpacing : 0.5 }}>WATER ME</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              ...styles.editButton,
              backgroundColor: "rgb(219,141,38)",
              borderWidth: 2,
              borderColor: "#ffd02c",
              marginVertical: 5
            }}
            onPress={() =>
              Alert.alert(
                "Are you sure ?",
                "You will leave this app",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => handleApi(), style: "OK" }
                ],
                { cancelable: false }
              )
            }
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Text style={{...styles.text, letterSpacing : 0.5 }}>BUY {name} !!</Text>
            </View>
          </TouchableOpacity>
        )}
        {invested / price < 1 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginVertical: 10
            }}
          >
            <Text style={{...styles.text, letterSpacing : 0.5 }}>Current Plan : {plan}</Text>
          </View>
        ) : null}
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
                paddingVertical: 10,
                letterSpacing : 0.5 
              }}
            >
              Input Amount :
            </Text>
            <TextInput
              value={amount.toLocaleString()}
              textAlign={"center"}
              placeholderTextColor="rgba(255,255,255,0.7)"
              id="password"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={amount =>
                setAmount(
                  Number(
                    amount
                      .split("")
                      .filter(el => el.match(/^[0-9]*$/))
                      .join("")
                  )
                )
              }
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInputAmount("manual")}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            <Text style={{ ...styles.text, paddingTop: 20, letterSpacing : 0.5  }}> or </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-around",
                paddingBottom: 20
              }}
            >
              <TouchableOpacity
                style={{
                  ...styles.button,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 5,
                  backgroundColor: "#ffd02c"
                }}
                onPress={() => handleInputAmount("recommended")}
              >
                <Text style={{ ...styles.text, color: "#b9523e", letterSpacing : 0.5  }}>
                  {" "}
                  Use Recommendation Settings{" "}
                </Text>
                <Tooltip
                  popover={
                    <ToolText>
                      Use recommended settings, allow the system to calculate 20%
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
                    style={{ color: "#b9523e" }}
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
    borderRadius: 5,
    width: 220
  },
  editButton: {
    backgroundColor: "#65a1ad",
    paddingVertical: 15,
    borderRadius: 5,
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
