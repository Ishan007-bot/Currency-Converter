import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCurrencies();
    loadSavedData();
  }, []);

  const fetchCurrencies = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://api.exchangerate-api.com/v4/latest/USD'
      );
      setCurrencies(Object.keys(response.data.rates));
      setError('');
    } catch (error) {
      setError('Unable to fetch currencies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedData = async () => {
    try {
      const savedFromCurrency = await AsyncStorage.getItem('fromCurrency');
      const savedToCurrency = await AsyncStorage.getItem('toCurrency');
      const savedAmount = await AsyncStorage.getItem('amount');
      if (savedFromCurrency) setFromCurrency(savedFromCurrency);
      if (savedToCurrency) setToCurrency(savedToCurrency);
      if (savedAmount) setAmount(savedAmount);
    } catch (error) {
      console.log('Error loading saved data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('fromCurrency', fromCurrency);
      await AsyncStorage.setItem('toCurrency', toCurrency);
      await AsyncStorage.setItem('amount', amount);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const convertCurrency = async () => {
    if (!amount || !fromCurrency || !toCurrency) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const rate = response.data.rates[toCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
      setError('');
      saveData();
    } catch {
      setError('Unable to fetch conversion rate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1409.jpg', 
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Currency Converter</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={setFromCurrency}
          value={fromCurrency}
          items={currencies.map((currency) => ({
            label: currency,
            value: currency,
          }))}
          placeholder={{ label: 'From Currency', value: null }}
        />
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={setToCurrency}
          value={toCurrency}
          items={currencies.map((currency) => ({
            label: currency,
            value: currency,
          }))}
          placeholder={{ label: 'To Currency', value: null }}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, isLoading && { opacity: 0.5 }]}
            onPress={convertCurrency}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Convert</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.swapButton]}
            onPress={swapCurrencies}
            activeOpacity={0.8}
          >
            <Icon name="swap-horiz" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {isLoading && <ActivityIndicator size="large" color="#4CAF50" />}

        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : result ? (
          <Animated.View entering={FadeIn} style={styles.resultContainer}>
            <Text style={styles.result}>{result}</Text>
          </Animated.View>
        ) : (
          <Text style={styles.placeholder}>Conversion result will appear here</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adds slight transparency for readability
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '70%',
  },
  swapButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    width: 60,
    height: 60,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: 20,
  },
});

