import { router } from 'expo-router';
import { Text, View,TextInput,StyleSheet } from 'react-native';
import { useState } from 'react';

import { useSession } from '@/ctx';
import Styles from '@/constants/Styles';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';

export default function SignIn() {
  const { signIn,session } = useSession();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(' ');

  const handleSignIn = async () => {
    try {
      await signIn(username, password);
      console.log(session)
      router.replace('/');
    } catch (err) {
      const errorMessage =
      err instanceof Error ? err.message : 'Sign-in failed';
    setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[Styles.card,{width:'100%'}]}>
        <Text style={[Styles.heading1,{margin:'auto'}]}>
          Login 
        </Text>
      <TextInput
        style={Styles.inputField}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor={Colors.textPlaceholder}
      />
      <TextInput
        style={Styles.inputField}
        placeholder="Password"
        placeholderTextColor={Colors.textPlaceholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />          
      <Text
        style={styles.error}>
        {error}
      </Text>
      <Button
        text='Submit'
        onPress={handleSignIn}>
      </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor:'#1a626e'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
  });