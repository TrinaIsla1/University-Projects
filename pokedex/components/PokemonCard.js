// components/PokemonCard.js
//
// This component renders ONE Pokemon as a card.
// It receives a single "pokemon" object as a prop (passed in from App.js)
// and lays it out: image (or placeholder), name, type, generation, description.
//
// This is a fully static/presentational component -- no hooks, no state.
// It just takes data in and renders UI out.

import { View, Text, Image, StyleSheet } from 'react-native';
import { getPokemonImage } from '../data/imageMap';

export default function PokemonCard({ pokemon }) {
  // Look up the real image file using the filename stored in pokemonData.js.
  // If it's not in imageMap.js yet (because you haven't added the image),
  // this will be "null" and we show a placeholder box instead.
  const imageSource = getPokemonImage(pokemon.image);

  return (
    <View style={styles.card}>
      {/* --- Image section --- */}
      {imageSource ? (
        // Real image found -- show it
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      ) : (
        // No image yet -- show a placeholder so the layout doesn't break
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>?</Text>
        </View>
      )}

      {/* --- Text info section --- */}
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.genBadge}>Gen {pokemon.generation}</Text>
        </View>
        <Text style={styles.type}>{pokemon.type}</Text>
        <Text style={styles.description}>{pokemon.description}</Text>
      </View>
    </View>
  );
}

// All styling lives here since React Native doesn't support .css files.
// Think of this as the equivalent of a CSS class list, but written in JS.
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    // simple shadow for a bit of depth (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    // shadow equivalent for Android
    elevation: 3,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 28,
    color: '#bbbbbb',
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
  genBadge: {
    fontSize: 12,
    color: '#ffffff',
    backgroundColor: '#5b7fdb',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  type: {
    fontSize: 13,
    color: '#5b7fdb',
    fontWeight: '600',
    marginTop: 2,
  },
  description: {
    fontSize: 13,
    color: '#555555',
    marginTop: 4,
  },
});
