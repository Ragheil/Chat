import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, TextInput  } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/background.jpg");


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== ""){
            signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Login successful"))
            .catch((err) => Alert.alert("Login failed", err.message));
            
        }
    };

    return(
        <View style={styles.container}>
            <Image  source={backImage} style = {styles.backImage}/>
            <View style = {styles.WhiteSheet}/>
            <SafeAreaView style= {styles.form}>
                <Text style = {styles.title}>Login</Text>

                <TextInput 
                    style = {styles.input}
                    placeholder="Enter Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                    <TextInput 
                        style = {styles.input}
                        placeholder="Enter Password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        keyboardType="email-address"
                        textContentType="password"
                        autoFocus={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                
                />

                <TouchableOpacity style = {styles.button} onPress={onHandleLogin} >
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Login</Text>
                </TouchableOpacity>

                <View style={{marginTop:20,flexDirection:'row', alignItems:'center',alignSelf: 'center'}}  >
                    <Text style={{color:'gray', fontWeight:'600', fontSize:14,}} >Dont Have Account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")} >
                    <Text style={{color:'#f57c00', fontWeight: '600', fontSize: 14,}}  >  Signup</Text>
                    </TouchableOpacity>
                </View>
              </SafeAreaView>
             </View>
    )
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
       
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
       // textAlign: "center",
       // margin: 10,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12

    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: "cover",
      //  resizeMode: "cover",
      //  justifyContent: "center",
      //  alignItems: "center",

    },   
    
    WhiteSheet: {
        width: "100%",
        height: "75%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45
       // alignItems: "center",
       // justifyContent: "center",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: "#f57c00",
        height: 58,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },

});