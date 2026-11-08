import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { globalStyles, colors } from './globalStyles';
import { recipes, getCategory } from './recipes';

export default function RecipeListScreen({ navigation, route }) {
  // Receive the category param sent from HomeScreen
  const { category } = route.params;
  const cat = getCategory(category);
  const filtered = recipes.filter((r) => r.category === category);

  return (
    <FlatList
      style={globalStyles.screen}
      contentContainerStyle={globalStyles.content}
      data={filtered}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={[styles.banner, { backgroundColor: cat.tint }]}>
          <Text style={styles.bannerEmoji}>{cat.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.bannerTitle, { color: cat.color }]}>{cat.name}</Text>
            <Text style={styles.bannerSub}>
              {filtered.length} recipes · {cat.tagline}
            </Text>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
          // Pass the whole recipe object to the details screen
          onPress={() => navigation.navigate('RecipeDetails', { recipe: item })}
        >
          <View style={[styles.emojiBox, { backgroundColor: cat.tint }]}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.chips}>
              <View style={[styles.chip, { backgroundColor: cat.tint }]}>
                <Text style={[styles.chipText, { color: cat.color }]}>⏱ {item.time}</Text>
              </View>
              <View style={[styles.chip, { backgroundColor: cat.tint }]}>
                <Text style={[styles.chipText, { color: cat.color }]}>{item.difficulty}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      )}
      ListFooterComponent={
        <Pressable
          style={[globalStyles.button, globalStyles.buttonOutline, { borderColor: cat.color }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[globalStyles.buttonText, { color: cat.color }]}>
            ← Back to Categories
          </Text>
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,
  },
  bannerEmoji: { fontSize: 40, marginRight: 14 },
  bannerTitle: { fontSize: 24, fontWeight: '800' },
  bannerSub: { fontSize: 13, color: colors.muted, marginTop: 2 },

  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  emojiBox: {
    width: 68,
    height: 68,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: { fontSize: 34 },
  info: { flex: 1 },
  name: { fontSize: 17, fontWeight: '800', color: colors.text },
  desc: { fontSize: 13, color: colors.muted, marginTop: 3, lineHeight: 18 },
  chips: { flexDirection: 'row', marginTop: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginRight: 8 },
  chipText: { fontSize: 12, fontWeight: '700' },
});
