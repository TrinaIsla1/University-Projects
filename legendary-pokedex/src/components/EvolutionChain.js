import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../theme/ThemeContext'

const TRIGGER_LABELS = {
  'level-up': 'Level up',
  trade: 'Trade',
  'use-item': 'Use item',
  shed: 'Special condition',
}

function describeTransition(stage) {
  if (!stage.trigger) return null
  const label = TRIGGER_LABELS[stage.trigger] ?? stage.trigger
  if (stage.minLevel) return `${label} (Lv. ${stage.minLevel})`
  if (stage.item) return `${label}: ${stage.item.replace(/-/g, ' ')}`
  return label
}

export default function EvolutionChain({ stages }) {
  const { theme } = useTheme()

  if (!stages || stages.length <= 1) {
    return (
      <Text style={[styles.empty, { color: theme.colors.subtext }]}>
        Does not evolve
      </Text>
    )
  }

  return (
    <View style={styles.row}>
      {stages.map((stage, i) => (
        <React.Fragment key={stage.name}>
          <View style={styles.stage}>
            <Text
              style={[styles.name, { color: theme.colors.text }]}
              numberOfLines={1}
            >
              {stage.name}
            </Text>
          </View>
          {i < stages.length - 1 && (
            <View style={styles.arrowWrap}>
              <Text style={[styles.arrow, { color: theme.colors.subtext }]}>
                →
              </Text>
              {describeTransition(stages[i + 1]) && (
                <Text
                  style={[styles.trigger, { color: theme.colors.subtext }]}
                  numberOfLines={2}
                >
                  {describeTransition(stages[i + 1])}
                </Text>
              )}
            </View>
          )}
        </React.Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  empty: { fontSize: 14, fontStyle: 'italic' },
  row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  stage: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(120,120,140,0.12)',
  },
  name: { fontSize: 13, fontWeight: '700', textTransform: 'capitalize' },
  arrowWrap: { alignItems: 'center', maxWidth: 90 },
  arrow: { fontSize: 16 },
  trigger: { fontSize: 10, textAlign: 'center' },
})
