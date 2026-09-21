import React from 'react'
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native'
import { useTheme } from '../theme/ThemeContext'
import { ALL_TYPES, colorForType } from '../utils/typeColors'
import { GENERATIONS } from '../data/legendaryRoster'

function Chip({ label, active, color, onPress }) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={[
        styles.chip,
        {
          borderColor: color ?? theme.colors.border,
          backgroundColor: active
            ? (color ?? theme.colors.accent)
            : theme.colors.card,
        },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          { color: active ? '#FFFFFF' : theme.colors.text },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

export default function FilterSheet({
  visible,
  onClose,
  selectedTypes,
  onToggleType,
  selectedGens,
  onToggleGen,
  onClearFilters,
  sortBy,
  onChangeSortBy,
}) {
  const { theme } = useTheme()

  const sortOptions = [
    { key: 'pokedexNumber', label: 'Pokédex #' },
    { key: 'name', label: 'Name (A–Z)' },
    { key: 'statTotal', label: 'Base stat total' },
    { key: 'gen', label: 'Generation' },
  ]

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { backgroundColor: theme.colors.card }]}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={[styles.heading, { color: theme.colors.text }]}>
            Sort by
          </Text>
          <View style={styles.chipRow}>
            {sortOptions.map((opt) => (
              <Chip
                key={opt.key}
                label={opt.label}
                active={sortBy === opt.key}
                onPress={() => onChangeSortBy(opt.key)}
              />
            ))}
          </View>

          <Text style={[styles.heading, { color: theme.colors.text }]}>
            Type
          </Text>
          <View style={styles.chipRow}>
            {ALL_TYPES.map((t) => (
              <Chip
                key={t}
                label={t}
                active={selectedTypes.includes(t)}
                color={colorForType(t)}
                onPress={() => onToggleType(t)}
              />
            ))}
          </View>

          <Text style={[styles.heading, { color: theme.colors.text }]}>
            Region / Generation
          </Text>
          <View style={styles.chipRow}>
            {GENERATIONS.map((g) => (
              <Chip
                key={g.gen}
                label={`Gen ${g.gen} · ${g.region}`}
                active={selectedGens.includes(g.gen)}
                onPress={() => onToggleGen(g.gen)}
              />
            ))}
          </View>

          <View style={styles.footerRow}>
            <Pressable
              onPress={onClearFilters}
              accessibilityRole="button"
              style={[
                styles.footerButton,
                { borderColor: theme.colors.border },
              ]}
            >
              <Text style={{ color: theme.colors.text, fontWeight: '600' }}>
                Clear filters
              </Text>
            </Pressable>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              style={[
                styles.footerButton,
                {
                  backgroundColor: theme.colors.accent,
                  borderColor: theme.colors.accent,
                },
              ]}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Done</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    maxHeight: '75%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: { padding: 20, gap: 8 },
  heading: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderWidth: 1.5,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 14,
    minHeight: 36,
  },
  chipText: { fontSize: 13, fontWeight: '600', textTransform: 'capitalize' },
  footerRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
  footerButton: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
})
