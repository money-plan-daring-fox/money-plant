import React, { useState, useEffect } from 'react'
import { View, Text, TouchableHighlight, TextInput, Picker, StyleSheetr, AsyncStorage, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import db from '../api/firebase'
import axios from 'axios'

let server = 'http://367711fb.ngrok.io/'

const NewPlant = props => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [plan, setPlan] = useState("default")
  const [investing, setInvesting] = useState(0)
  const [deadline, setDeadline] = useState(0)
  const [income, setIncome] = useState(0)
  const [uid, setUid] = useState("")
  const [loading, setLoading] = useState(false)

function getPriceRecommendation(name) {
  setLoading(true)
  axios
  .get(server+'getItemsPrice?key='+name)
  .then(({data}) => {
    // let priceRecommend = Number(data[0].price.match(/\d+/g).map(Number).join(''));
    let priceRecommend = data[0].price.split('').filter(el => el.match(/^[0-9]*$/)).join('')
    setPrice(priceRecommend.toLocaleString())
  })
  .finally(() => {
    setLoading(false)
  })
}

  useEffect(() => {
    Promise
      .all([AsyncStorage.getItem("income"), AsyncStorage.getItem("uid")])
      .then(([incomeKu, uidKu]) => {

        setIncome(incomeKu)
        setUid(uidKu)
      })



      // .then(data => {
      //   setIncome(data)
      // })

      // .then(data => {
      //   setUid(data)
      // })
  }, [])


  // VALIDASI PLAN B DAN C HARUS MEMUNGKINKAN DENGAN INCOME USER
  // VALIDASI PLAN B DAN C HARUS MEMUNGKINKAN DENGAN INCOME USER
  // VALIDASI PLAN B DAN C HARUS MEMUNGKINKAN DENGAN INCOME USER

  const createPlant = (nameInput, priceInput, planInput, investingInput, deadlineInput) => {





    if (planInput === "default") {
      db.firestore()
        .collection("plants")
        .doc()
        .set({
          name: nameInput,
          price: Number(priceInput),
          plan: planInput,
          invested: 0,
          investing: (income * 0.2),
          deadline: Math.ceil(priceInput / (income * 0.2)),
          createdAt: new Date(),
          updatedAt: new Date(),
          stage: Math.ceil((0 / priceInput) * 5),
          uid: uid,
          history: [],
        })
        .then(() => {
        })
        .catch(err => {
        })
    } else if (planInput === "money") {
      db.firestore()
        .collection("plants")
        .doc()
        .set({
          name: nameInput,
          price: Number(priceInput),
          plan: planInput,
          invested: 0,
          investing: investingInput,
          deadline: price / investingInput,
          createdAt: new Date(),
          updatedAt: new Date(),
          stage: Math.ceil((0 / priceInput) * 5),
          uid: uid,
          history: [],
        })
        .then(() => {
        })
        .catch(err => {
        })
    } else if (planInput === "month") {
      db.firestore()
        .collection("plants")
        .doc()
        .set({
          name: nameInput,
          price: Number(priceInput),
          plan: planInput,
          invested: 0,
          investing: priceInput / deadlineInput,
          deadline: Number(deadlineInput),
          createdAt: new Date(),
          updatedAt: new Date(),
          stage: Math.ceil((0 / priceInput) * 5),
          uid: uid,
          history: [],
        })
        .then(() => {
        })
        .catch(err => {
        })
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Plant/Product Name"
        placeholderTextColor="white"
        onChangeText={name => setName(name)}
        onEndEditing={() => getPriceRecommendation(name)}
      />
      <View>
        {
          loading?
          <ActivityIndicator size="small" color="#31422e" />
          :
          <TextInput
            style={styles.input}
            value={price}
            placeholder="Price"
            placeholderTextColor="white"
            onChangeText={price => setPrice(price)}
            keyboardType="numeric"
          />
        }
      </View>
      <Text style={{ ...styles.text, paddingTop: 15, paddingBottom: 6 }}> How would you like to Save? </Text>

      <Picker
        selectedValue={plan}
        style={{ height: 50, width: 250 }}
        onValueChange={(itemValue, itemIndex) => {
          setPlan(itemValue)
        }}
        itemStyle={styles.picker}
      >
        <Picker.Item label="Default" value="default" />
        <Picker.Item label="$ / month" value="money" />
        <Picker.Item label="Month" value="month" />
      </Picker>

      {
        plan === "default" &&
        <Text style={{ color: "white" }}>(20% x income) / month</Text>
      }

      {
        plan === "month" &&
        <View>
          <Text style={{ color: "white" }}>(Price / number of months) / month</Text>
          <TextInput
            placeholder="Number of months"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="numeric"
            onChangeText={num => setDeadline(num)} />
        </View>
      }

      {
        plan === "money" &&
        <View>
          <Text style={{ color: "white" }}>(Selected investment) / month</Text>
          <TextInput
            placeholder="Investments per month"
            placeholderTextColor="rgba(255,255,255,0.7)"
            keyboardType="numeric"
            onChangeText={num => setInvesting(num)} />
        </View>
      }

      <TouchableOpacity
        style={styles.button}
        onPress={() => createPlant(name, price, plan, investing, deadline)}>
        <Text style={styles.text}>Create plant</Text>
      </TouchableOpacity>
    </View>
  )
}

NewPlant.navigationOptions = props => ({
  title: "New Plant",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#31422e",
  },
})

const styles = {
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
  picker: {
    height: 50,
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
    width: 200
  }
};

export default NewPlant