import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colorForType } from '../utils/typeColors'

export default function TypeBadge({ type, small = false }) {
  return (
    <View
      style={[
        styles.badge,
        small && styles.badgeSmall,
        { backgroundColor: colorForType(type) },
      ]}
    >
      <Text style={[styles.text, small && styles.textSmall]}>
        {type.toUpperCase()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  badgeSmall: { paddingVertical: 2, paddingHorizontal: 8, borderRadius: 10 },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textSmall: { fontSize: 10 },
})
