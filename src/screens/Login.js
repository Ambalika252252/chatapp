import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  StyleSheet,
} from "react-native";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Logged In !!"))
        .catch((err) => Alert.alert("Login failed!!", err.message));
    }
  };

  const onSignup = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <Text style={styles.login}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          autoCapitalize="none"
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}>
            {" "}
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSignup}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}>
            {" "}
            Sign Up
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF8F1",
  },
  login: {
    fontSize: 36,
    fontWeight: "bold",
    color: "blue",
    alignSelf: "center",
    paddingBottom: 24,
    color: '#54BAB9'
  },
  input: {
    backgroundColor: "#F7ECDE",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    borderColor: "#E9DAC1",
    borderWidth: 2
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#E9DAC1",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 5,
    borderColor: '#54BAB9',
    borderBottomWidth: 2,
    borderLeftWidth: 2
  },
});
