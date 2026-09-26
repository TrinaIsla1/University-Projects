import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import TypeBadge from './TypeBadge'
import { useTheme } from '../theme/ThemeContext'

export default function PokemonListItem({ item, onPress }) {
  const { theme } = useTheme()

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.types.join(' and ')} type, generation ${item.gen}`}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={styles.imageWrap}>
        {item.sprite ? (
          <Image
            source={{ uri: item.sprite }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View
            style={[
              styles.image,
              styles.imageFallback,
              { backgroundColor: theme.colors.border },
            ]}
          />
        )}
      </View>
      <View style={styles.info}>
        <Text
          style={[styles.name, { color: theme.colors.text }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text style={[styles.meta, { color: theme.colors.subtext }]}>
          {item.pokedexNumber
            ? `#${String(item.pokedexNumber).padStart(3, '0')}`
            : '#—'}{' '}
          · Gen {item.gen} · {item.region}
        </Text>
        <View style={styles.typeRow}>
          {item.types.map((t) => (
            <TypeBadge key={t} type={t} small />
          ))}
          {item.loadFailed && (
            <Text style={[styles.warn, { color: theme.colors.danger }]}>
              Couldn't load details
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    marginHorizontal: 12,
    marginVertical: 6,
    minHeight: 76, // REQ-4.6.2: meets platform min tap-target size
    gap: 12,
  },
  imageWrap: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: 56, height: 56 },
  imageFallback: { borderRadius: 8 },
  info: { flex: 1, gap: 4 },
  name: { fontSize: 16, fontWeight: '700' },
  meta: { fontSize: 12 },
  typeRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  warn: { fontSize: 11 },
})
