import React, { useState, useLayoutEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Regresar",
    });
  }, [navigation]);

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Crea una cuenta gratis
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Nombre Completo"
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="URL Imagen de Perfil (opcional)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.button}
        onPress={register}
        raised={true}
        title="Register"
      />
      <Button
        onPress={() => navigation.navigate("Login")}
        containerStyle={styles.button}
        type="outline"
        title="Login"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 280,
    marginTop: 10,
  },
});
