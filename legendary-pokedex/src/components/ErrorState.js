import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function ErrorState({ message, onRetry }) {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.message, { color: theme.colors.text }]}>{message}</Text>
      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel="Retry"
        style={[styles.button, { backgroundColor: theme.colors.accent }]}
      >
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  message: { fontSize: 15, textAlign: 'center' },
  button: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 8, minHeight: 44, justifyContent: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
});
