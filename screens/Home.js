import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, TextInput  } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';

const catImageUrl= "https://img.freepik.com/free-vector/gradient-dynamic-lines-background_23-2149005728.jpg?w=996&t=st=1704262816~exp=1704263416~hmac=1263c5bfbbebd5499abf2ff6310165ed455655b82f58cbbcd6b016f7e2d7087";

const Home = () => {
    const navigation = useNavigation();
    useEffect(() => {
         navigation.setOptions({
          headerLeft: () => (
            <FontAwesome name="search" size={24} color= {colors.gray} style={{marginLeft: 15}}></FontAwesome>
          ),
            headerRight: () => (
                <Image source={{url: catImageUrl}}
                style={{width: 30, 
                    height: 30, 
                    marginRight: 15
                }}
                
                />
            ),
        })
    }, [navigation]);

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={styles.chatButton}>
            <Entypo name="chat" size={24} color= {colors.lighGray}></Entypo>
            </TouchableOpacity>
        </View>
    )
   
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-end",
        alignItems: "flex-end",

    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .9,
        shadowRadius: 2,
        marginBottom: 50,
        marginRight: 20,
    }
});