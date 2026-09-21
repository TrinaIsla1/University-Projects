import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native'
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio'

import { useTheme } from '../theme/ThemeContext'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import TypeBadge from '../components/TypeBadge'
import StatBar from '../components/StatBar'
import EvolutionChain from '../components/EvolutionChain'

export default function DetailScreen({ route }) {
  const { apiName } = route.params
  const { theme } = useTheme()
  const { data, status, errorMessage, retry } = usePokemonDetail(apiName)
  const [showShiny, setShowShiny] = useState(false)
  const [activeForm, setActiveForm] = useState(0)

  if (status === 'loading' && !data) {
    return <LoadingState label="Loading Pokémon…" />
  }
  if (status === 'error' && !data) {
    return <ErrorState message={errorMessage} onRetry={retry} />
  }
  if (!data) return null

  const sprite = showShiny && data.shinySprite ? data.shinySprite : data.sprite

  const playCry = async () => {
    if (!data.cry) return
    try {
      await setAudioModeAsync({ playsInSilentMode: true })
      const player = createAudioPlayer({ uri: data.cry })
      player.play()
      setTimeout(() => player.release(), 4000)
    } catch (err) {
      console.log('[cry] playback error:', err)
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.content}
    >
      <View style={styles.heroWrap}>
        {sprite ? (
          <Image
            source={{ uri: sprite }}
            style={styles.hero}
            resizeMode="contain"
          />
        ) : (
          <View
            style={[styles.hero, { backgroundColor: theme.colors.border }]}
          />
        )}
        {data.shinySprite && (
          <Pressable
            onPress={() => setShowShiny((v) => !v)}
            accessibilityRole="button"
            style={[styles.shinyToggle, { borderColor: theme.colors.border }]}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 12,
                fontWeight: '600',
              }}
            >
              {showShiny ? 'Show normal' : 'Show shiny ✨'}
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.headerRow}>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {data.name}
        </Text>
        <Text style={[styles.dexNum, { color: theme.colors.subtext }]}>
          #{String(data.pokedexNumber).padStart(3, '0')}
        </Text>
      </View>
      {data.category && (
        <Text style={[styles.category, { color: theme.colors.subtext }]}>
          {data.category}
        </Text>
      )}

      <View style={styles.typeRow}>
        {data.types.map((t) => (
          <TypeBadge key={t} type={t} />
        ))}
      </View>

      {/* REQ-4.4.2: indicate multiple forms and allow toggling */}
      {data.hasMultipleForms && data.forms.length > 1 && (
        <View style={styles.formsRow}>
          {data.forms.map((form, i) => (
            <Pressable
              key={form}
              onPress={() => setActiveForm(i)}
              style={[
                styles.formChip,
                {
                  borderColor: theme.colors.border,
                  backgroundColor:
                    activeForm === i ? theme.colors.accent : theme.colors.card,
                },
              ]}
            >
              <Text
                style={{
                  color: activeForm === i ? '#FFFFFF' : theme.colors.text,
                  fontSize: 12,
                }}
              >
                {form.replace(/-/g, ' ')}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {data.flavorText && (
        <Text style={[styles.flavor, { color: theme.colors.text }]}>
          {data.flavorText}
        </Text>
      )}

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={[styles.metaLabel, { color: theme.colors.subtext }]}>
            Height
          </Text>
          <Text style={[styles.metaValue, { color: theme.colors.text }]}>
            {(data.height / 10).toFixed(1)} m
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={[styles.metaLabel, { color: theme.colors.subtext }]}>
            Weight
          </Text>
          <Text style={[styles.metaValue, { color: theme.colors.text }]}>
            {(data.weight / 10).toFixed(1)} kg
          </Text>
        </View>
        {data.cry && (
          <Pressable
            onPress={playCry}
            accessibilityRole="button"
            accessibilityLabel="Play cry"
            style={styles.metaItem}
          >
            <Text style={[styles.metaLabel, { color: theme.colors.subtext }]}>
              Cry
            </Text>
            <Text style={[styles.metaValue, { color: theme.colors.accent }]}>
              ▶ Play
            </Text>
          </Pressable>
        )}
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Abilities
      </Text>
      {data.abilities.map((a) => (
        <Text
          key={a.name}
          style={[styles.ability, { color: theme.colors.text }]}
        >
          {a.name.replace(/-/g, ' ')} {a.isHidden ? '(Hidden)' : ''}
        </Text>
      ))}

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Base Stats
      </Text>
      {data.stats.map((s) => (
        <StatBar key={s.name} statName={s.name} value={s.value} />
      ))}

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Evolution
      </Text>
      <EvolutionChain stages={data.evolutionStages} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 48, gap: 4 },
  heroWrap: { alignItems: 'center', marginBottom: 8 },
  hero: { width: 220, height: 220 },
  shinyToggle: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: { fontSize: 26, fontWeight: '800', textTransform: 'capitalize' },
  dexNum: { fontSize: 16, fontWeight: '600' },
  category: { fontSize: 13, marginBottom: 8 },
  typeRow: { flexDirection: 'row', gap: 8, marginVertical: 8 },
  formsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  formChip: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minHeight: 32,
  },
  flavor: { fontSize: 14, lineHeight: 20, marginVertical: 8 },
  metaRow: { flexDirection: 'row', gap: 28, marginVertical: 12 },
  metaItem: { alignItems: 'flex-start' },
  metaLabel: { fontSize: 11, textTransform: 'uppercase', marginBottom: 2 },
  metaValue: { fontSize: 15, fontWeight: '700' },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  ability: { fontSize: 14, marginBottom: 4, textTransform: 'capitalize' },
})
