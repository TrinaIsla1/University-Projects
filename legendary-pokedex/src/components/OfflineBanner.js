import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export default function OfflineBanner() {
  const { theme } = useTheme();
  return (
    <View style={[styles.banner, { backgroundColor: theme.colors.danger }]}>
      <Text style={styles.text}>You're offline — showing previously loaded data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { paddingVertical: 6, paddingHorizontal: 12, alignItems: 'center' },
  text: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
});
