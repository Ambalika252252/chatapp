import React, { useState, useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { onIdTokenChanged } from "firebase/auth";
import auth from '../config/firebase'; 
import { AuthContext } from '../../App'; 
import ChatStack from '../stack/ChatStack';
import AuthStack from '../stack/AuthStack';

const MainNavigator = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser ? authenticatedUser : null);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
