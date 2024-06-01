// ChatStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/Chat";

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Chat}>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export default ChatStack;
