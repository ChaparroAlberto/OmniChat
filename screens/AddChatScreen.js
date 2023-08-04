import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Añadir nuevo chat",
    });
  }, [navigation]);

  const createChat = async () => {
    await addDoc(collection(db, "chats"), {
      chatName: input,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Ingrese un nombre al chat"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={<Ionicons name="chatbubbles" size={24} color="gray" />}
      />
      <Button disabled={!input} onPress={createChat} title="Crear nuevo chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
