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
} from "react-native";
import firebase from 'firebase'
import db from '../api/firebase'
import * as Font from 'expo-font'

const Login = props => {
  const [fontLoad, setFontLoad] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [income, setIncome] = useState('')
  const [registerPage, setRegisterPage] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Font.loadAsync({
      MachineGunk: require("../assets/fonts/MachineGunk.otf")
    }).then(() => {
      setFontLoad(true)
    });
  }, [])
  const signin = async (email, pass) => {
    setLoading(true)
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, pass)
      db.firestore()
        .collection('users')
        .where('email', '==', email)
        .get()
        .then(data => {
          data.forEach(item => {
            const { balance, email, income } = item.data()
            AsyncStorage.setItem('id', item.id)
            AsyncStorage.setItem('balance', balance)
            AsyncStorage.setItem('email', email)
            AsyncStorage.setItem('income', income)
          })
          alert('Logged In!')
          setEmail('')
          setPassword('')
          setLoading(false)
          props.navigation.navigate('Home')
        })
        .catch(err => {
          console.log({err})
        })
    } catch (err) {
      alert(err.toString())
    }
  }
  const signup = async (email, pass, income) => {
    setLoading(true)
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, pass)
      let newUser = {
        email,
        balance: 0,
        plants: [],
        income
      }
      db.firestore()
        .collection('users')
        .add(newUser)
        .then(ref => {
          alert('Account registered!')
          setEmail('')
          setPassword('')
          setLoading(false)
        })
        .catch(err => {
          console.log({ err })
        })
      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      alert(error.toString())
    }
  }
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      // Navigate to login view
      props.navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    }
  }

  return fontLoad ? (
    <View style={styles.container}>
      {/* <ImageBackground
        source={{
          uri:
            "https://img.icons8.com/doodle/96/000000/gold-pot.png"
        }}
        style={{
          width: 100,
          height: 100
        }}
        resizeMode="cover"
      >
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
        </View>
      </ImageBackground> */}
      <View>
        <Text
          style={{
            fontFamily: "MachineGunk",
            textAlign: "center",
            letterSpacing: 5,
            fontSize: 80,
            marginBottom: -35,
            color: "#587e5b"
          }}
        >
          SAVING
        </Text>
        <Text
          style={{
            fontFamily: "MachineGunk",
            textAlign: "center",
            letterSpacing: 1,
            fontSize: 50,
            marginBottom: -30,
            color: "#fff"
          }}
        >
          PLANT
        </Text>
      </View>
      <KeyboardAvoidingView behavior="padding">
        {
          registerPage
          ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 70
              }}
            >
              <TextInput
                placeholder="username or email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                id="email"
                style={styles.input}
                onSubmitEditing={() => this.password.focus()}
                returnKeyType = {"next"}
                blurOnSubmit={false}
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                placeholder="password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                id="password"
                secureTextEntry={true}
                style={styles.input}
                blurOnSubmit={false}
                ref={(input) => { this.password = input; }}
                returnKeyType = {"next"}
                onChangeText={text => setPassword(text)}
                onSubmitEditing={() => this.income.focus()}
              />
              <TextInput
                placeholder="income (rp/month)"
                placeholderTextColor="rgba(255,255,255,0.7)"
                id="income"
                style={styles.input}
                ref={(input) => { this.income = input }}
                onChangeText={text => setIncome(text)}
              />
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setRegisterPage(false)}
                  style={styles.button}
                >
                  <Text style={styles.text}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => signup(email, password, income) }
                  style={styles.button2}
                >
                  <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
          : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 70
              }}
            >
              <TextInput
                placeholder="username or email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                id="email"
                style={styles.input}
                returnKeyType = {"next"}
                onSubmitEditing={() => this.secondTextInput.focus()}
                blurOnSubmit={false}
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                placeholder="password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                id="password"
                secureTextEntry={true}
                style={styles.input}
                ref={(input) => { this.secondTextInput = input }}
                onChangeText={text => setPassword(text)}
              />
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => signin(email, password)}
                  style={styles.button}
                >
                  {
                    loading
                    ? <ActivityIndicator size="small" color="#fff" />
                    : <Text style={styles.text}>Sign In</Text>
                  }
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setRegisterPage(true)}
                  style={styles.button2}
                >
                  <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
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
    margin: 5,
  },
  button2: {
    backgroundColor: "#039be5",
    paddingVertical: 15,
    borderRadius: 30,
    width: 200,
    margin: 5,
  }
});

export default Login;
