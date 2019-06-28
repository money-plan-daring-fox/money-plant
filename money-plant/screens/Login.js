import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions
} from "react-native";
import { Font } from "expo";

const Login = props => {
  const [fontLoad, setFontLoad] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      MachineGunk: require("../assets/fonts/MachineGunk.otf")
    }).then(() => {
      setFontLoad(true);
    });
  }, []);

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
          />
          <TextInput
            placeholder="password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            id="password"
            style={styles.input}
          />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Home")}
              style={styles.button}
            >
              <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>
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
    fontFamily: "PingFangHK-Light",
    textAlign: "center",
    color: "#fff"
  },
  button: {
    backgroundColor: "#b9523e",
    paddingVertical: 15,
    borderRadius: 30,
    width: 200
  }
});

export default Login;
