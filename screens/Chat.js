import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { TouchableOpacity } from 'react-native';
import { collection, addDoc, query, onSnapshot, where, orderBy } from 'firebase/firestore';
import { signOut, auth, database } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';

function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch(error => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.primary} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const currentUserEmail = auth.currentUser?.email; // Get the email of the current authenticated user

    if (currentUserEmail) {
      const chatCollection = collection(database, 'chats');
      const q = query(
        chatCollection,
        where('participants', 'array-contains', currentUserEmail),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({
            _id: doc.id,
            createdAt: doc.data().createdAt,
            text: doc.data().text,
            user: doc.data().user,
          }))
        );
      });

      return () => unsubscribe();
    }
  }, []);

  const onSend = useCallback(messages => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300',
      }}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
    />
  );
}

export default Chat;
