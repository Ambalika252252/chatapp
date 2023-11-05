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

export default function Login({}) {
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
    if (email !== "" && password !== "" && name !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          console.log("Signed Up!!");
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: name,
          });
          console.log("name updated!!");
        })
        .catch((err) => Alert.alert("Signup Failed!!", err.message));
    } else {
      Alert.alert(
        "Please fill all the fields!!",
        "All the fields are required for signing up."
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <Text style={styles.login}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name (if signing up)"
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
    backgroundColor: "#fff",
  },
  login: {
    fontSize: 36,
    fontWeight: "bold",
    color: "blue",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#f1f1f1",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "blue",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
