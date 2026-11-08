// App.js
//
// This is the entry point of the app (what Expo loads first).
// It's fully static: no hooks, no state, no API calls.
// It just reads the pokemonList array and renders one PokemonCard per entry.

import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar } from 'react-native';
import { pokemonList } from './data/pokemonData';
import PokemonCard from './components/PokemonCard';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Simple header at the top of the screen */}
      <Text style={styles.title}>Legendary Pokedex</Text>
      <Text style={styles.subtitle}>Generations I - III</Text>

      {/*
        FlatList is React Native's version of a scrollable list.
        - data: the array we're looping over
        - keyExtractor: tells React how to uniquely identify each item
        - renderItem: what to render for each item (one PokemonCard)
        Because pokemonList never changes, we don't need useState here --
        it's just read once and rendered.
      */}
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    color: '#222222',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888888',
    marginBottom: 8,
  },
  list: {
    paddingBottom: 24,
  },
});
