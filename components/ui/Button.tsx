import React from 'react';
import { StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import Colors from '@/constants/Colors';

type Props = {
  color?: string; 
  textColor?: string; 
  onPress: () => void;
  text: string;
};

const Button = ({ color = Colors.primary,textColor=Colors.white, onPress, text }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]} // Use dynamic color
      onPress={onPress}
    >
      <Text style={[styles.buttonText,{color: textColor}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3, // For Android shadow
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
