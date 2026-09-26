import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { useTheme } from '../theme/ThemeContext'

export default function SearchBar({ value, onChangeText }) {
  const { theme } = useTheme()
  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by name…"
        placeholderTextColor={theme.colors.subtext}
        style={[styles.input, { color: theme.colors.text }]}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Search Legendary Pokémon by name"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
  },
  input: { height: 44, fontSize: 15 }, // REQ-4.6.2: 44pt min tap target
})
