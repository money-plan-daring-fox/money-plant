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
  ActivityIndicator,
  Image
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
  const [name, setName] = useState("")
  const [registerPage, setRegisterPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);

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
          data.forEach( item => {
            const { balance, email, income, uid, concurrent, name } = item.data();
            console.log({ name })
            let newUid = uid == null ? "" : uid;
            AsyncStorage.setItem("id", item.id);
            AsyncStorage.setItem("name", name);
            AsyncStorage.setItem("balance", balance.toString());
            AsyncStorage.setItem("concurrent", concurrent.toString())
            AsyncStorage.setItem("email", email);
            AsyncStorage.setItem("income", income.toString());
            AsyncStorage.setItem("uid", newUid);
          });
          // alert('Logged In!')
          setEmail("");
          setPassword("");
          setLoading(false);
          props.navigation.navigate("Home");
        })
        .catch(err => {
          alert(err.toString());
          setLoading(false);
        });
    } catch (err) {
      alert(err.toString());
      setLoading(false);
    }
  };
  const signup = async (email, pass, income, name) => {
    setLoading(true);
    console.log({name})
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass);
      let newUser = {
        email, name,
        balance: 0,
        concurrent: 0,
        plants: [],
        income,
        uid: user.user.uid,
        notifications: [],
        totalInvestingPerMonth: 0,
        completedPlants: 0,
        ongoingPlants: 0,
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
          alert(error.toString());
          setLoading(false);
        });
      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      alert(error.toString());
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      // Navigate to login view
      props.navigation.navigate("Home");
    } catch (error) {}
  };

  return fontLoad ? (
    <View style={styles.container}>
      <Image
        onLoadStart={() => setLogoLoading(true)}
        onLoadEnd={() => setLogoLoading(false)}
        source={{
          uri:
            "https://firebasestorage.googleapis.com/v0/b/money-plant-328e6.appspot.com/o/logo.png?alt=media&token=0f0ed0be-e04d-472a-9191-4ba172b7311c"
        }}
        style={{
          width: "100%",
          height: Dimensions.get("window").width / 2
        }}
        resizeMode="contain"
      />
      {logoLoading && (
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
          <ActivityIndicator size="small" color="#ffd02c" animating={logoLoading} />
        </View>
      )}
      <View style={{ width: "100%", alignItems: "flex-end", marginRight: 100 }}>
        <View style={{ width: "50%" }}>
          <Text style={{ ...styles.text, textAlign: "right", letterSpacing : 0.8 }}>
            Get your exquisite gadget by devoted to a wonderful plant...
          </Text>
        </View>
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
              placeholder="email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              id="email"
              style={styles.input}
              onSubmitEditing={() => this.name.focus()}
              returnKeyType={"next"}
              blurOnSubmit={false}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              placeholder="name"
              placeholderTextColor="rgba(255,255,255,0.7)"
              id="name"
              onChangeText={text => setName(text)}
              onSubmitEditing={() => this.password.focus()}
              returnKeyType={"next"}
              blurOnSubmit={false}
              style={styles.input}
              value={name}
              ref={input => {
                this.name = input;
              }}
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
                  await signup(email, password, income, name);
                  await signin(email, password);
                }}
                style={styles.button2}
              >
                {
                  loading
                  ? <ActivityIndicator size="small" color="#fff"/>
                  : <Text style={styles.text}>Register</Text>
                }
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
                  <Ionicons
                    name="ios-arrow-back"
                    size={15}
                    color="#fff"
                    style={{ paddingRight: 5 }}
                  />
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
              placeholder="email"
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
    color: "#fff",
    letterSpacing : 0.8
  },
  button: {
    backgroundColor: "#b9523e",
    paddingVertical: 15,
    borderRadius: 5,
    width: 200,
    margin: 5
  },
  button2: {
    backgroundColor: "#039be5",
    paddingVertical: 15,
    borderRadius: 5,
    width: 200,
    margin: 5
  }
});

export default Login;
