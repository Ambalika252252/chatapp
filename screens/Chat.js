import React, { useState, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from "../config/firebase";
import { AntDesign } from "@expo/vector-icons";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Signout Failed: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Amba's Chat Room",
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 12, alignItems: "center" }}
          onPress={onSignOut}
        >
          <AntDesign
            name="poweroff"
            size={24}
            color={"#f1f1f1"}
            style={{ marginRight: 8 }}
          />
          <Text style={{ color: "#f1f1f1", marginRight: 8 }}>Log Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const logoutt = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return logoutt;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      showAvatarForEveryMessage={false}
      renderUsernameOnMessage={true}
      messages={messages}
      showUserAvatar={false}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 24,
      }}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
      }}
      onSend={(messages) => onSend(messages)}
    />
  );
}
