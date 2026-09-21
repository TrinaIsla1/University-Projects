import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

const MAX_STAT = 255; // PokéAPI's practical ceiling for a single base stat

export default function StatBar({ statName, value }) {
  const { theme } = useTheme();
  const pct = Math.min(100, Math.round((value / MAX_STAT) * 100));

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: theme.colors.subtext }]}>
        {STAT_LABELS[statName] ?? statName}
      </Text>
      <View style={[styles.track, { backgroundColor: theme.colors.border }]}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: theme.colors.accent }]} />
      </View>
      <Text style={[styles.value, { color: theme.colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 4 },
  label: { width: 68, fontSize: 12, fontWeight: '600' },
  track: { flex: 1, height: 10, borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
  value: { width: 32, fontSize: 12, fontWeight: '700', textAlign: 'right' },
});
