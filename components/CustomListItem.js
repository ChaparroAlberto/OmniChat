import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { db, auth } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chats", id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setChatMessages(snapshot.docs.map((doc) => doc.data()))
    );

    return unsubscribe;
  }, []);

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        size={32}
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
