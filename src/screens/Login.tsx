import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const auth = FIREBASE_AUTH;

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '456086389243-bq028qc0tm25g4vh02bpvug4360ppjaf.apps.googleusercontent.com',
    iosClientId: '456086389243-gek0tsd8vk2ahnv3fdj7qb4v9529jc8c.apps.googleusercontent.com',
    androidClientId: '456086389243-fshq56f459hqv0lehlm4r2cdon3t8cv6.apps.googleusercontent.com',
    webClientId: '456086389243-bq028qc0tm25g4vh02bpvug4360ppjaf.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          navigation.navigate('MainTabs');
        })
        .catch((err) => {
          Alert.alert('Erro ao fazer login com Google', err.message);
        });
    }
  }, [response]);

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('MainTabs');
    } catch (error: any) {
      Alert.alert('Erro ao fazer login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#f6fafd', '#e0ecf8']}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Faça o login</Text>

        <Text style={styles.inputLabel}>Insira o e-mail:</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#888"
          />
        </View>

        <Text style={styles.inputLabel}>Insira a senha:</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.iconButton}
          >
            <MaterialCommunityIcons
              name={secureText ? 'eye-off' : 'eye'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2e64e5" style={{ marginTop: 30 }} />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.googleButton]}
              onPress={() => promptAsync()}
              disabled={!request}
            >
              <MaterialCommunityIcons name="google" size={20} color="#fff" />
              <Text style={styles.googleButtonText}>Entrar com Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('Cadastrar')}
            >
              <Text style={styles.registerText}>Novo por aqui? Cadastre-se!</Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2e64e5',
    marginBottom: 30,
    alignSelf: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffee',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  iconButton: {
    position: 'absolute',
    right: 10,
  },
  button: {
    backgroundColor: '#2e64e5',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#2e64e5',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  googleButton: {
    backgroundColor: '#db4437',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  registerButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  registerText: {
    color: '#2e64e5',
    fontSize: 16,
    fontWeight: '600',
  },
});