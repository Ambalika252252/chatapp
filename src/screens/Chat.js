import React, { useState, useLayoutEffect, useCallback } from "react";
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat, InputToolbar, Composer, Send } from "react-native-gifted-chat";
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
      title: "Ambalika's Chat Room",
      headerStyle: {
        backgroundColor: '#F7ECDE',
      },
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 12, alignItems: "center" }}
          onPress={onSignOut}
        >
          <AntDesign
            name="poweroff"
            size={18}
            color={"#54BAB9"}
            style={{ marginRight: 8 }}
          />
          <Text style={{ color: "#54BAB9", marginRight: 8, fontWeight: "600" }}>Log Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(messages);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    }).then(() => {
      console.log("Message sent successfully:", messages[0]);
    }).catch((error) => {
      console.error("Error sending message:", error);
    });
  }, []);

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        borderTopWidth: 1,
        borderTopColor: '#E9DAC1',
        backgroundColor: '#54BAB9',
        padding: 5, // Adjust padding to fit the input and send button
      }}
    />
  );

  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={{
        color: '#ffffff',
        height: 100,
        padding: 10,
      }}
    />
  );

  const renderSend = (props) => (
    <Send
      {...props}
      containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        marginBottom: 5,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: '#F7ECDE',
          borderRadius: 20,
          padding: 10,
          elevation: 5
        }}
      >
        <AntDesign name="arrowright" size={24} color="#54BAB9" />
      </TouchableOpacity>
    </Send>
  );

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
      showUserAvatar={true}
      messagesContainerStyle={{
        backgroundColor: "#FBF8F1",
      }}
      renderInputToolbar={renderInputToolbar}
      renderComposer={renderComposer}
      renderSend={renderSend}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL
      }}
      onSend={(messages) => onSend(messages)}
    />
  );
}
