import { router } from 'expo-router';
import { Text, View,TextInput,StyleSheet } from 'react-native';
import { useState } from 'react';

import { useSession } from '@/ctx';

export default function SignIn() {
  const { signIn,session } = useSession();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>(' ');

  const handleSignIn = async () => {
    try {
      await signIn(username, password);
      console.log(session)
      router.replace('/'); // Navigate after successful sign-in
    } catch (err) {
      const errorMessage =
      err instanceof Error ? err.message : 'Sign-in failed';
    setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />          
      <Text
        style={styles.error}>
        {error}
      </Text>
      <Text
        style={{color:'black'}}
        onPress={handleSignIn}>
        Sign In
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
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