import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
  Button,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import firebase from "firebase";
import db from "../api/firebase";
import * as Font from "expo-font";
import { red } from "ansi-colors";
import { Feather, EvilIcons, Ionicons } from "@expo/vector-icons";

const Login = props => {
  const [fontLoad, setFontLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [income, setIncome] = useState("");
  const [registerPage, setRegisterPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      MachineGunk: require("../assets/fonts/MachineGunk.otf")
    }).then(() => {
      setFontLoad(true);
    });
  }, []);
  const signin = async (email, pass) => {
    setLoading(true);
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, pass);
      db.firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then(data => {
          data.forEach(item => {
            
            const { balance, email, income, uid } = item.data()
            // console.log(item.data());
            
            // console.log('aku login, ini uid', uid);
            // console.log('aku login, ini balance', balance);
            // console.log('aku login, ini email', email);
            // console.log('aku login, ini income', income);
            // console.log('aku login, ini id', item.id);
            let newUid = uid == null ? "" : uid

            AsyncStorage.setItem('id', item.id)
            AsyncStorage.setItem('balance', balance)
            AsyncStorage.setItem('email', email)
            AsyncStorage.setItem('income', income)
            AsyncStorage.setItem('uid', newUid)
          })
          // alert('Logged In!')
          setEmail('')
          setPassword('')
          setLoading(false)
          props.navigation.navigate('Home')
        })
        .catch(err => {
          // console.log({err})
          alert(err.toString())
          setLoading(false)
        })
    } catch (err) {
      alert(err.toString())
      setLoading(false)
    }
  };
  const signup = async (email, pass, income) => {
    setLoading(true);
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass);
      let newUser = {
        email,
        balance: 0,
        plants: [],
        income,
        uid: user.user.uid,
        notifications: []
      };
      db.firestore()
        .collection("users")
        .add(newUser)
        .then(ref => {
          alert("Account registered!");
          setEmail("");
          setPassword("");
          setLoading(false);
        })
        .catch(err => {
          alert(error.toString())
          setLoading(false)
          // console.log({ err })
        })
      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      alert(error.toString())
      setLoading(false)
    }
  };
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      // Navigate to login view
      props.navigation.navigate("Home");
    } catch (error) {
      // console.log(error);
    }
  };

  return fontLoad ? (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            "https://png2.kisspng.com/sh/989ef1fe0bea347df5f50c701e5ec83e/L0KzQYi4UsEyN2U8e5GAYULoRYKChvM6Omg8TZC6MkS2Q4qBUcE2OWMAUKYEOUG7QoSCTwBvbz==/5a2e519fc92775.1243398115129849918239.png"
        }}
        style={{
          width: 20,
          height: 20,
          marginBottom: 10,
          marginLeft: 30
        }}
        resizeMode="cover"
      >
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        />
      </ImageBackground>
      <View
        style={{
          width: "85%",
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: "#b9523e",
          borderBottomWidth: 6,
          borderBottomEndRadius: 15
        }}
      >
        <Text
          style={{
            fontFamily: "MachineGunk",
            textAlign: "center",
            letterSpacing: 5,
            fontSize: 120,
            color: "#587e5b",
            position: "absolute"
          }}
        >
          SAVING
        </Text>
        <Text
          style={{
            fontFamily: "MachineGunk",
            textAlign: "center",
            letterSpacing: 1,
            fontSize: 30,
            color: "#fff"
          }}
        >
          PLANT
        </Text>
      </View>
      <View
        style={{
          width: "50%",
          alignSelf: "center",
          marginLeft: 80,
          paddingTop: 20
        }}
      >
        <Text style={{ ...styles.text, textAlign: "right" }}>
          Get your exquisite gadget by devoted to a wonderful plant
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding">
        {registerPage ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 40
            }}
          >
            <TextInput
              placeholder="username or email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              id="email"
              style={styles.input}
              onSubmitEditing={() => this.password.focus()}
              returnKeyType={"next"}
              blurOnSubmit={false}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              placeholder="password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              id="password"
              value={password}
              secureTextEntry={true}
              style={styles.input}
              blurOnSubmit={false}
              ref={input => {
                this.password = input;
              }}
              returnKeyType={"next"}
              onChangeText={text => setPassword(text)}
              onSubmitEditing={() => this.income.focus()}
            />
            <TextInput
              placeholder="income (rp/month)"
              placeholderTextColor="rgba(255,255,255,0.7)"
              id="income"
              value={income}
              style={styles.input}
              ref={input => {
                this.income = input;
              }}
              onChangeText={text => setIncome(text)}
            />
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={async () => {
                  await signup(email, password, income);
                  await signin(email, password);
                }}
                style={styles.button2}
              >
                <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRegisterPage(false)}
                style={styles.button}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Ionicons name="ios-arrow-back" size={15} color="#fff" style={{paddingRight : 5}} />
                  <Text style={styles.text}>Sign In</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 40
            }}
          >
            <TextInput
              placeholder="username or email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              id="email"
              value={email}
              style={styles.input}
              returnKeyType={"next"}
              onSubmitEditing={() => this.secondTextInput.focus()}
              blurOnSubmit={false}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              value={password}
              placeholder="password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              id="password"
              secureTextEntry={true}
              style={styles.input}
              ref={input => {
                this.secondTextInput = input;
              }}
              onChangeText={text => setPassword(text)}
            />
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => signin(email, password)}
                style={styles.button}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.text}>Sign In</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setRegisterPage(true)}
                style={styles.button2}
              >
                <Text style={styles.text}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  ) : (
    <Text> Loading Font ... </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262525",
    justifyContent: "center",
    alignItems: "center"
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
    width: 200,
    margin: 5
  },
  button2: {
    backgroundColor: "#039be5",
    paddingVertical: 15,
    borderRadius: 30,
    width: 200,
    margin: 5
  }
});

export default Login;
