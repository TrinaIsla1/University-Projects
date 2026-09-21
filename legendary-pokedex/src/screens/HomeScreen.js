import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

import { useTheme } from '../theme/ThemeContext';
import { useLegendaryRoster } from '../hooks/useLegendaryRoster';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

import SearchBar from '../components/SearchBar';
import FilterSheet from '../components/FilterSheet';
import PokemonListItem from '../components/PokemonListItem';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import OfflineBanner from '../components/OfflineBanner';

function sortItems(items, sortBy) {
  const sorted = [...items];
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'statTotal':
      return sorted.sort((a, b) => b.statTotal - a.statTotal);
    case 'gen':
      return sorted.sort((a, b) => a.gen - b.gen || a.pokedexNumber - b.pokedexNumber);
    case 'pokedexNumber':
    default:
      return sorted.sort((a, b) => (a.pokedexNumber ?? 9999) - (b.pokedexNumber ?? 9999));
  }
}

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const isConnected = useNetworkStatus(); // REQ-5.2.3
  const { items, loadedCount, total, status, errorMessage, retry } = useLegendaryRoster();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 250); // REQ-4.2.2
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGens, setSelectedGens] = useState([]);
  const [sortBy, setSortBy] = useState('pokedexNumber');
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleType = (t) =>
    setSelectedTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const toggleGen = (g) =>
    setSelectedGens((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));
  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedGens([]);
    setQuery('');
  };

  // REQ-4.3.4: filters (name, type, region/generation) combine together and
  // update the visible list immediately.
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    let list = items;
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    if (selectedTypes.length) list = list.filter((p) => p.types.some((t) => selectedTypes.includes(t)));
    if (selectedGens.length) list = list.filter((p) => selectedGens.includes(p.gen));
    return sortItems(list, sortBy);
  }, [items, debouncedQuery, selectedTypes, selectedGens, sortBy]);

  const activeFilterCount = selectedTypes.length + selectedGens.length;

  if (status === 'loading' && items.length === 0) {
    return <LoadingState label={`Loading Pokédex… (${loadedCount}/${total})`} />;
  }
  if (status === 'error' && items.length === 0) {
    return <ErrorState message={errorMessage} onRetry={retry} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {!isConnected && <OfflineBanner />}

      <View style={styles.searchRow}>
        <View style={{ flex: 1 }}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
        <Pressable
          onPress={() => setFilterVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Open filters and sort"
          style={[styles.filterButton, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
        >
          <Text style={{ color: theme.colors.text, fontWeight: '700' }}>
            Filter{activeFilterCount ? ` (${activeFilterCount})` : ''}
          </Text>
        </Pressable>
      </View>

      <Text style={[styles.resultCount, { color: theme.colors.subtext }]}>
        {filtered.length} of {total} Legendaries
        {status === 'loading' ? ` · still loading (${loadedCount}/${total})` : ''}
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <PokemonListItem
            item={item}
            onPress={() => navigation.navigate('Detail', { apiName: item.apiName, name: item.name })}
          />
        )}
        contentContainerStyle={styles.listContent}
        // REQ-4.1.3: windowed rendering keeps scrolling smooth even though
        // the full roster (71 entries) is well under the lazy-load threshold.
        initialNumToRender={16}
        maxToRenderPerBatch={16}
        windowSize={7}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.colors.subtext }]}>
            No Legendaries match your filters.
          </Text>
        }
      />

      <FilterSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        selectedTypes={selectedTypes}
        onToggleType={toggleType}
        selectedGens={selectedGens}
        onToggleGen={toggleGen}
        onClearFilters={clearFilters}
        sortBy={sortBy}
        onChangeSortBy={setSortBy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingRight: 12 },
  filterButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultCount: { fontSize: 12, marginHorizontal: 16, marginTop: 10, marginBottom: 2 },
  listContent: { paddingBottom: 24 },
  empty: { textAlign: 'center', marginTop: 48, fontSize: 14 },
});
