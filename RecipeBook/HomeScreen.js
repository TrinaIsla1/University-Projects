import React from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { globalStyles, colors } from './globalStyles';
import { categories, recipes } from './recipes';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>👩‍🍳</Text>
        <Text style={styles.heroTitle}>What are you craving?</Text>
        <Text style={styles.heroSubtitle}>
          {recipes.length} easy recipes, sorted by mealtime.
        </Text>
      </View>

      {categories.map((cat) => {
        const count = recipes.filter((r) => r.category === cat.name).length;
        return (
          <Pressable
            key={cat.id}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: cat.tint, borderColor: cat.color },
              pressed && styles.pressed,
            ]}
            // Navigate forward and pass the chosen category as a param
            onPress={() => navigation.navigate('RecipeList', { category: cat.name })}
          >
            <View style={styles.emojiCircle}>
              <Text style={styles.emoji}>{cat.emoji}</Text>
            </View>

            <View style={styles.textBlock}>
              <Text style={[styles.name, { color: cat.color }]}>{cat.name}</Text>
              <Text style={styles.tagline}>{cat.tagline}</Text>
              <Text style={styles.count}>{count} recipes</Text>
            </View>

            <View style={[styles.arrowCircle, { backgroundColor: cat.color }]}>
              <Text style={styles.arrow}>›</Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', marginBottom: 24, marginTop: 8 },
  heroEmoji: { fontSize: 44, marginBottom: 8 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: colors.text, textAlign: 'center' },
  heroSubtitle: { fontSize: 15, color: colors.muted, marginTop: 6, textAlign: 'center' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    marginBottom: 14,
  },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  emojiCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emoji: { fontSize: 32 },
  textBlock: { flex: 1 },
  name: { fontSize: 20, fontWeight: '800' },
  tagline: { fontSize: 13, color: colors.muted, marginTop: 2 },
  count: { fontSize: 12, fontWeight: '700', color: colors.text, marginTop: 6 },
  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: { color: colors.white, fontSize: 24, fontWeight: '700', marginTop: -2 },
});
