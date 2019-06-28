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
  Button
} from "react-native";
import { Font } from "expo";
import firebase from 'firebase'

const Login = props => {
  const [fontLoad, setFontLoad] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    Font.loadAsync({
      MachineGunk: require("../assets/fonts/MachineGunk.otf")
    }).then(() => {
      setFontLoad(true);
    });
  }, []);
  // console.log(process.env.REACT_APP_FIREBASE_KEY)
  const signin = async (email, pass) => {
    try {
      await firebase.auth()
        .signInWithEmailAndPassword(email, pass);
      console.log("Logged In!");
      // Navigate to the Home page
      props.navigation.navigate("Home")
    } catch (error) {
      console.log(error.toString())
    }
  }
  const signup = async (email, pass) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth()
      .signInWithCredential(provider)
      .then(result => {
        console.log({ result })
      })
      .catch(err => {
        console.log({ err })
      })
    // email = 'testucup@mail.com'
    // pass = 'fb12345'
    // try {
    //   await firebase.auth()
    //     .createUserWithEmailAndPassword(email, pass);
    //   console.log("Account created");
    //   // Navigate to the Home page, the user is auto logged in

    // } catch (error) {
    //   console.log(error.toString())
    // }
  }
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      // Navigate to login view
      props.navigation.navigate('Login')
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = input => {
    console.log({input})
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
          MONEY
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
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            id="password"
            style={styles.input}
            onChangeText={text => setPassword(text)}
          />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => signin(email, password)}
              style={styles.button}
            >
              <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => signup('email', 'password')}
              style={styles.button2}
            >
              <Text style={styles.text}>Login with Google</Text>
            </TouchableOpacity>
            {/* <Button title="Tes Google" onPress={() => signup('email','password')} /> */}
          </View>
        </View>
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
