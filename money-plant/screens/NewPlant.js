import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Picker,
  StyleSheetr,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import db from "../api/firebase";
import axios from "axios";
import { Feather, EvilIcons, Ionicons } from "@expo/vector-icons";
import firebase from 'firebase'

let server = "http://f42c1495.ngrok.io/";

const NewPlant = props => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [plan, setPlan] = useState("default");
  const [investing, setInvesting] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [income, setIncome] = useState(0);
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [investingPerMonthDatabase, setInvestingPerMonthDatabase] = useState(0)

  function getPriceRecommendation(name) {
    setLoading(true);
    axios
      .get(server + "users/getItemsPrice?key=" + name)
      .then(({ data }) => {
        // let priceRecommend = Number(data[0].price.match(/\d+/g).map(Number).join(''));
        let priceRecommend = data[0].price
          .split("")
          .filter(el => el.match(/^[0-9]*$/))
          .join("");
        setPrice(+priceRecommend.toLocaleString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem("income"),
      AsyncStorage.getItem("uid"),
      AsyncStorage.getItem("id")
    ]).then(([incomeKu, uidKu, idKu]) => {
      setIncome(incomeKu);
      setUid(uidKu);
      setId(idKu)
      return idKu
    })
    .then(id => {
      console.log('aku use effect')
      console.log(id)
      db.firestore()
      .collection("users")
      .doc(id)
      .onSnapshot(user => {
        console.log(user.data())
        setInvestingPerMonthDatabase(user.data().totalInvestingPerMonth)
      })
    })
  }, []);

  // VALIDASI PLAN B DAN C HARUS MEMUNGKINKAN DENGAN INCOME USER
  // VALIDASI PLAN B DAN C HARUS MEMUNGKINKAN DENGAN INCOME USER
  // VALIDASI PLAN B DAN C HARUS MEMUNGKINKAN DENGAN INCOME USER

  const createPlant = (
    nameInput,
    priceInput,
    planInput,
    investingInput,
    deadlineInput
  ) => {
    let input = {
      name: nameInput,
      price: Number(priceInput),
      plan: planInput,
      invested: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      stage: 1,
      uid: uid,
      history: [{ updatedAt: new Date(), invested: 0 }],
      completed: false
    };

    let dueDate = new Date();
    
    if (planInput === "default") {
      dueDate.setMonth(
        dueDate.getMonth() + Math.ceil(priceInput / (income * 0.2))
      );
      input.investing = income * 0.2;
      input.deadline = Math.ceil(priceInput / (income * 0.2)) * 30;
    } else if (planInput === "money") {
      dueDate.setMonth(dueDate.getMonth() + price / investingInput);
      input.investing = Number(investingInput);
      input.deadline = (price / investingInput) * 30;
      if(Number(income) < Number(investingInput)){
        return alert(`ini income ${income}, ini investing ${investing}, ini investingInput ${investingInput}`)
      } else {
        console.log('tembak firestore cieeeee');
      }

    } else if (planInput === "month") {
      dueDate.setMonth(dueDate.getMonth() + Number(deadlineInput));
      input.investing = Number(priceInput / deadlineInput);
      input.deadline = Number(deadlineInput) * 30;
      if(Number(income) < Number(priceInput / deadlineInput)){
        return alert(`Your current income (${income}) is less than the monthly payment (${priceInput / deadlineInput})`)
      } else {
        console.log('tembak firestore cieeeee');
      }
    }

    if(Number(income) < Number(investingPerMonthDatabase) + Number(input.investing)) return alert("Your current income is insufficient")

    input.dueDate = dueDate;
    db.firestore()
      .collection("plants")
      .doc()
      .set(input)
      .then(() => {
        return db.firestore()
          .collection("users")
          .doc(id)
          .update({
            totalInvestingPerMonth:firebase.firestore.FieldValue.increment(input.investing),
            ongoingPlants: firebase.firestore.FieldValue.increment(1),
          })
          .then(() => {
            console.log(planInput, "berhasil uy");
            props.navigation.navigate('Garden')
          })
      })
      .catch(err => {
        console.log(input)
        console.log("fail firestore")
        // console.log(planInput, "fail uy");
      });
  };
  return (
    <View style={styles.container}>
      <Image
      onLoadStart={() => setLoading(true)}
      onLoadEnd={() => setLoading(false)}
        source={{
          uri: "https://img.icons8.com/office/344/hand-planting--v2.png"
        }}
        style={{
          width: Dimensions.get("window").width / 2,
          height: Dimensions.get("window").width / 2,
          marginVertical: 30
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Plant/Product Name"
        placeholderTextColor="white"
        onChangeText={name => setName(name)}
        onEndEditing={() => getPriceRecommendation(name)}
      />
      <View>
        {loading ? (
          <ActivityIndicator size="small" color="#31422e" />
        ) : (
          <TextInput
            style={styles.input}
            value={price.toLocaleString()}
            placeholder="Price"
            placeholderTextColor="white"
            onChangeText={price => setPrice(Number(price.split("").filter(el => el.match(/^[0-9]*$/)).join("")))}
            keyboardType="numeric"
          />
        )}
      </View>
      <Text style={{ ...styles.text, paddingTop: 15, paddingBottom: 6, letterSpacing : 0.5 }}>
        How would you like to Save?
      </Text>

      <Picker
        selectedValue={plan}
        style={{ height: 50, width: 250 }}
        onValueChange={(itemValue, itemIndex) => {
          setPlan(itemValue);
        }}
        itemStyle={styles.picker}
      >
        <Picker.Item label="Almond" value="default" />
        <Picker.Item label="Bloom" value="money" />
        <Picker.Item label="Cactus" value="month" />
      </Picker>

      {plan === "default" && (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
            width: "70%",
            marginVertical: 15
          }}
        >
          <Feather name="info" size={20} color="#fff" />
          <Text style={{ ...styles.text, paddingLeft: 10, letterSpacing : 0.5  }}>
            Allows system to calculate 20 % of your
            income and deduct value every month
          </Text>
        </View>
      )}

      {plan === "month" && (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "center",
              width: "70%",
              marginVertical: 15
            }}
          >
            <Feather name="info" size={20} color="#fff" />
            <Text style={{ ...styles.text, paddingLeft: 10, letterSpacing : 0.5  }}>
              Please input duration ( in month ) below, to get your desired item
            </Text>
          </View>
          <TextInput
            placeholder="Number of months"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="numeric"
            onChangeText={num => setDeadline(num)}
            style={styles.input}
          />
        </View>
      )}

      {plan === "money" && (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "center",
              width: "70%",
              marginVertical: 15
            }}
          >
            <Feather name="info" size={20} color="#fff" />
            <Text style={{ ...styles.text, paddingLeft: 10, letterSpacing : 0.5  }}>
              Please input how much money you would like to invest per month to get your
              desired item
            </Text>
          </View>
          <TextInput
            value={investing.toLocaleString()}
            placeholder="Investments per month"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="numeric"
            onChangeText={num => setInvesting(Number(num.split("").filter(el => el.match(/^[0-9]*$/)).join("")))}
            style={styles.input}
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => createPlant(name, price, plan, investing, deadline)}
      >
        <Text style={{...styles.text, letterSpacing : 0.5 }}>Create plant</Text>
      </TouchableOpacity>
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
          <ActivityIndicator size="small" color="#ffd02c" animating={loading} />
        </View>
      )}
    </View>
  );
};

NewPlant.navigationOptions = props => ({
  title: "New Plant",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#587e5b"
  }
});

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#262525",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#FFF",
    borderRadius: 10
  },
  picker: {
    height: 50,
    width: 250,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#FFF",
    borderRadius: 10
  },
  header: {
    fontFamily: "MachineGunk",
    textAlign: "center",
    letterSpacing: 1,
    fontSize: 50,
    marginBottom: -35,
    color: "#587e5b"
  },
  text: {
    fontFamily: "MachineGunk",
    textAlign: "center",
    color: "#fff"
  },
  button: {
    backgroundColor: "#b9523e",
    paddingVertical: 15,
    borderRadius: 30,
    width: 200
  }
};

export default NewPlant;
